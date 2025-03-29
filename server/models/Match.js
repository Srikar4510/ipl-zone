const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  winner: { type: String, required: true },
  mostSixes: { type: String, required: true },
  mostFours: { type: String, required: true },
  mostWickets: { type: String, required: true },
  playerOfTheMatch: { type: String, required: true },
  points: { type: Number, default: 0 }
});

const MatchSchema = new mongoose.Schema({
  scheduleId: { type: Number, required: true, unique: true },
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  date: { type: Date, required: true },
  predictions: [PredictionSchema],
  results: {
    winner: String,
    mostSixes: String,
    mostFours: String,
    mostWickets: String,
    playerOfTheMatch: String
  }
});

module.exports = mongoose.model('Match', MatchSchema);
