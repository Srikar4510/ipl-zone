const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Match = require('../models/Match');
const User = require('../models/User'); // For users listing

// Middleware to check admin role
const adminAuth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// POST /api/admin/match/:matchId/update
// Update match results and recalculate points for predictions.
router.post('/match/:matchId/update', adminAuth, async (req, res) => {
  const { matchId } = req.params;
  const { winner, mostSixes, mostFours, mostWickets, playerOfTheMatch } = req.body;

  // Helper function: if correctAnswer is an array, return true if predAnswer is in the array.
  // Otherwise, do a direct comparison.
  const isCorrect = (predAnswer, correctAnswer) => {
    if (Array.isArray(correctAnswer)) {
      return correctAnswer.includes(predAnswer);
    }
    return predAnswer === correctAnswer;
  };

  try {
    let match = null;
    // First, try to find the match using a Mongo ObjectId.
    if (mongoose.Types.ObjectId.isValid(matchId)) {
      match = await Match.findById(matchId);
    }
    // If not found, treat matchId as a schedule id (a number)
    if (!match) {
      match = await Match.findOne({ scheduleId: Number(matchId) });
    }
    if (!match) return res.status(404).json({ msg: 'Match not found' });

    // Update the results field with admin's input
    match.results = { winner, mostSixes, mostFours, mostWickets, playerOfTheMatch };

    // Recalculate points for each prediction
    for (let i = 0; i < match.predictions.length; i++) {
      let pred = match.predictions[i];
      let points = 0;
      if (pred.winner === winner) points += 50;
      if (isCorrect(pred.mostSixes, mostSixes)) points += 10;
      if (isCorrect(pred.mostFours, mostFours)) points += 10;
      if (isCorrect(pred.mostWickets, mostWickets)) points += 10;
      if (pred.playerOfTheMatch === playerOfTheMatch) points += 20;
      pred.points = points;
    }

    // Mark the predictions array as modified and save the match.
    match.markModified('predictions');
    const updatedMatch = await match.save();
    res.json(updatedMatch);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



// GET /api/admin/users - Return all non-admin users with email, username, and role.
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }, 'email username role');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// GET /api/admin/match/:matchId/predictions
router.get('/match/:matchId/predictions', adminAuth, async (req, res) => {
  const { matchId } = req.params;
  try {
    let match = null;
    if (mongoose.Types.ObjectId.isValid(matchId)) {
      match = await Match.findById(matchId).populate('predictions.user', 'username email');
    }
    if (!match) {
      match = await Match.findOne({ scheduleId: Number(matchId) }).populate('predictions.user', 'username email');
    }
    if (!match) return res.status(404).json({ msg: 'Match not found' });
    res.json(match.predictions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
