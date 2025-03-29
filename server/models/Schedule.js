const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  teams: { type: String, required: true },
  date: { type: String, required: true }, // format: "YYYY-MM-DD"
  time: { type: String, required: true }, // e.g., "19:30"
  venue: { type: String, required: true }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
