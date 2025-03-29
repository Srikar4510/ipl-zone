import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import OTPVerification from './components/OTPVerification';
import MatchPrediction from './components/MatchPrediction';
import AdminPage from './components/AdminPage';
import AdminUsers from './components/AdminUsers';
import AdminPredictions from './components/AdminPredictions';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setIsDarkMode(true);
  }, []);

  // Toggle theme and persist
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <Router>
      <div className={`App ${isDarkMode ? "dark" : ""}`}>
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/match/:matchId" element={<MatchPrediction />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/predictions" element={<AdminPredictions />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
