const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Match = require('../models/Match');

// Authentication middleware (same as before)
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

// GET /api/mypredictions
// This endpoint returns an array of all predictions submitted by the logged-in user across matches.
router.get('/', auth, async (req, res) => {
  try {
    // Find matches where at least one prediction belongs to the user.
    const matches = await Match.find({ "predictions.user": req.user.userId });
    let userPredictions = [];
    matches.forEach(match => {
      // For each match, filter out the predictions made by the logged-in user.
      const preds = match.predictions.filter(pred => pred.user.toString() === req.user.userId);
      preds.forEach(pred => {
        userPredictions.push({
          matchId: match.scheduleId, // or match._id if you prefer
          teams: `${match.team1} vs ${match.team2}`,
          date: match.date,
          prediction: {
            winner: pred.winner,
            mostSixes: pred.mostSixes,
            mostFours: pred.mostFours,
            mostWickets: pred.mostWickets,
            playerOfTheMatch: pred.playerOfTheMatch,
            points: pred.points
          },
          actualResults: match.results || null
        });
      });
    });
    // Optionally, sort by match date:
    userPredictions.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json(userPredictions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
