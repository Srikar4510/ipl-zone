const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// GET /api/leaderboard
router.get('/', async (req, res) => {
  try {
    // Get all matches and populate predictions' user field (only username)
    const matches = await Match.find({}).populate('predictions.user', 'username');
    
    // Aggregate points and count matches per user
    const leaderboard = {};
    matches.forEach(match => {
      match.predictions.forEach(pred => {
        if (pred.user) {
          const userId = pred.user._id.toString();
          if (!leaderboard[userId]) {
            leaderboard[userId] = { 
              username: pred.user.username, 
              totalPoints: 0,
              matchesPlayed: 0
            };
          }
          // Even if points is 0, count this as a match played.
          leaderboard[userId].totalPoints += (pred.points || 0);
          leaderboard[userId].matchesPlayed++;
        }
      });
    });
    
    // Convert to an array and compute average points
    const leaderboardArray = Object.values(leaderboard).map(user => {
      // Calculate average (and fix to 2 decimals)
      const avg = user.matchesPlayed > 0 ? (user.totalPoints / user.matchesPlayed).toFixed(2) : "0.00";
      return {
        ...user,
        averagePoints: avg
      };
    }).sort((a, b) => b.totalPoints - a.totalPoints);
    
    res.json(leaderboardArray);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
