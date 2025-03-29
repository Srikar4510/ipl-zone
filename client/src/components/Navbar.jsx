import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaBars, FaTimes, FaAdjust } from "react-icons/fa";
import "./Navbar.css";

const themes = ["light",  "pastel"];

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let isAdmin = false;
  let isLoggedIn = false;

  if (token) {
    isLoggedIn = true;
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.role === "admin";
    } catch (error) {
      console.error("Invalid token");
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Theme toggle logic
  const [themeIndex, setThemeIndex] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const index = themes.indexOf(savedTheme);
    if (index !== -1) setThemeIndex(index);
    document.querySelector(".App")?.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const root = document.querySelector(".App");
    if (!root) return;

    const currentTheme = themes[themeIndex];
    const nextIndex = (themeIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    root.classList.remove(currentTheme);
    root.classList.add(nextTheme);
    setThemeIndex(nextIndex);
    localStorage.setItem("theme", nextTheme);
  };

  const renderLinks = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        return (
          <>
            <li><Link to="/admin" className="nav-link" onClick={toggleMenu}>Admin Panel</Link></li>
            <li><Link to="/admin/users" className="nav-link" onClick={toggleMenu}>All Users</Link></li>
            <li><Link to="/admin/predictions" className="nav-link" onClick={toggleMenu}>Predictions</Link></li>
            <li><Link to="/leaderboard" className="nav-link" onClick={toggleMenu}>Leaderboard</Link></li>
            <li><button onClick={() => { toggleMenu(); logout(); }} className="nav-link logout-button">Logout</button></li>
          </>
        );
      } else {
        return (
          <>
            <li><Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/leaderboard" className="nav-link" onClick={toggleMenu}>Leaderboard</Link></li>
            <li><button onClick={() => { toggleMenu(); logout(); }} className="nav-link logout-button">Logout</button></li>
          </>
        );
      }
    } else {
      return (
        <>
          <li><Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/leaderboard" className="nav-link" onClick={toggleMenu}>Leaderboard</Link></li>
          <li><Link to="/login" className="nav-link" onClick={toggleMenu}>Login</Link></li>
          <li><Link to="/signup" className="nav-link" onClick={toggleMenu}>Signup</Link></li>
        </>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">🏏 IPL Zone</div>
        <div className="right-icons">
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme">
            <FaAdjust />
          </button>
          <div className="menu-icon" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
        <ul className={`nav-list ${menuOpen ? "active" : ""}`}>
          {renderLinks()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
