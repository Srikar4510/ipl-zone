const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/match', require('./routes/match'));
app.use('/api/schedule', require('./routes/schedule'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/leaderboard', require('./routes/leaderboard'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
