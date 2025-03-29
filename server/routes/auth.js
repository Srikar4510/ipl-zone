const express = require('express');
const router = express.Router();
const User = require('../models/User');
const TempUser = require('../models/TempUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Configure nodemailer (adjust settings as needed)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,  // your email address
    pass: process.env.EMAIL_PASS   // your email password or app password
  }
});

// Signup route: create TempUser and send OTP
// Signup route: create TempUser and send OTP
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user already exists in the main collection
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Remove any existing TempUser for this email
    await TempUser.deleteOne({ email });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 minutes

    const tempUser = new TempUser({ username, email, password, otp, otpExpiry });
    await tempUser.save();

    // Configure and send OTP email (adjust as needed)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for IPL Competition Signup',
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error sending OTP email' });
      } else {
        res.json({ msg: 'OTP sent to your email', email });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// OTP Verification: create real User from TempUser
// OTP Verification: create real User from TempUser
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) return res.status(400).json({ msg: 'No signup request found for this email' });
    if (tempUser.otp !== otp) return res.status(400).json({ msg: 'Invalid OTP' });
    if (tempUser.otpExpiry < new Date()) return res.status(400).json({ msg: 'OTP expired' });

    const newUser = new User({
      username: tempUser.username, // Include username
      email: tempUser.email,
      password: tempUser.password // already hashed by TempUser pre-save
    });
    await newUser.save();
    await TempUser.deleteOne({ email });

    const payload = { userId: newUser._id, role: newUser.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Login route using email
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
