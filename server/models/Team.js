const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // "Bat", "Bowl", "All Rounder"
  logo: String,
  jersey: String
});

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  players: [PlayerSchema]
});

module.exports = mongoose.model('Team', TeamSchema);
