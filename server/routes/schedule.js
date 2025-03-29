const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Filter matches with date >= today
    const count = await Schedule.countDocuments({ date: { $gte: todayStr } });
    const schedules = await Schedule.find({ date: { $gte: todayStr } })
      .sort({ date: 1, time: 1 })
      .skip(skip)
      .limit(limit);
      
    res.json({
      schedules,
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
