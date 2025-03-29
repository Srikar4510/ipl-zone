const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Match = require('../models/Match');
const Schedule = require('../models/Schedule');
const Team = require('../models/Team');

// Authentication middleware for users
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// GET /api/match/:matchId
// Returns the match document (creating one if needed) along with squad details.
router.get('/:matchId', auth, async (req, res) => {
  const { matchId } = req.params;
  try {
    let match = null;
    // If matchId is a valid ObjectId, try to find the Match document.
    if (mongoose.Types.ObjectId.isValid(matchId)) {
      match = await Match.findById(matchId);
    }
    // Otherwise, treat matchId as a schedule id (number)
    if (!match) {
      const schedule = await Schedule.findOne({ id: Number(matchId) });
      if (!schedule) return res.status(404).json({ msg: 'Match not found' });
      const teams = schedule.teams.split(" vs ");
      // Try to find an existing match with that scheduleId
      match = await Match.findOne({ scheduleId: schedule.id });
      if (!match) {
        match = new Match({
          scheduleId: schedule.id,
          team1: teams[0],
          team2: teams[1],
          date: new Date(`${schedule.date}T${schedule.time}:00`),
          predictions: []
        });
        await match.save();
      }
    }
    // Fetch squad details from the Team collection.
    const team1 = await Team.findOne({ name: match.team1 });
    const team2 = await Team.findOne({ name: match.team2 });
    const matchWithSquads = match.toObject();
    matchWithSquads.squads = {
      [match.team1]: team1 ? team1.players : [],
      [match.team2]: team2 ? team2.players : []
    };
    // Also include a flag if the current user has already submitted a prediction.
    matchWithSquads.hasPredicted = match.predictions.some(
      pred => pred.user.toString() === req.user.userId
    );
    res.json(matchWithSquads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST /api/match/predict/:matchId
// Allows a user to submit a prediction if not already submitted.
router.post('/predict/:matchId', auth, async (req, res) => {
  const { matchId } = req.params;
  const { winner, mostSixes, mostFours, mostWickets, playerOfTheMatch } = req.body;
  try {
    let match = null;
    if (mongoose.Types.ObjectId.isValid(matchId)) {
      match = await Match.findById(matchId);
    }
    if (!match) {
      const schedule = await Schedule.findOne({ id: Number(matchId) });
      if (!schedule) return res.status(404).json({ msg: 'Match not found' });
      const teams = schedule.teams.split(" vs ");
      match = await Match.findOne({ scheduleId: schedule.id });
      if (!match) {
        match = new Match({
          scheduleId: schedule.id,
          team1: teams[0],
          team2: teams[1],
          date: new Date(`${schedule.date}T${schedule.time}:00`),
          predictions: []
        });
        await match.save();
      }
    }
    if (match.predictions.some(p => p.user.toString() === req.user.userId)) {
      return res.status(400).json({ msg: 'Prediction already submitted' });
    }
    match.predictions.push({
      user: req.user.userId,
      winner,
      mostSixes,
      mostFours,
      mostWickets,
      playerOfTheMatch,
      points: 0 // Points will be updated when the admin updates match results.
    });
    await match.save();
    res.json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
