const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const TempUserSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Added username field
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  otp: { type: String, required: true },
  otpExpiry: { type: Date, required: true }
});

TempUserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('TempUser', TempUserSchema);
