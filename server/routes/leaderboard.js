const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// GET /api/leaderboard
router.get('/', async (req, res) => {
  try {
    // Get all matches and populate predictions' user field (only username)
    const matches = await Match.find({}).populate('predictions.user', 'username');
    // Aggregate points per user
    const leaderboard = {};
    matches.forEach(match => {
      match.predictions.forEach(pred => {
      
        if ( pred.user) {
          const userId = pred.user._id.toString();
          if (!leaderboard[userId]) {
            leaderboard[userId] = { username: pred.user.username, totalPoints: 0 };
          }
          leaderboard[userId].totalPoints += (pred.points || 0);
        }
      });
    });
    // Convert to an array and sort descending by totalPoints
    const leaderboardArray = Object.values(leaderboard).sort((a, b) => b.totalPoints - a.totalPoints);
    res.json(leaderboardArray);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
