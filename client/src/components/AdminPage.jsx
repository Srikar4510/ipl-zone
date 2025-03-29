import React, { useState } from 'react';
import axios from "../utils/axios"; 
import "./AdminPage.css";

function AdminPage() {
  const [matchId, setMatchId] = useState('');
  const [results, setResults] = useState({
    winner: '',
    mostSixes: '',
    mostFours: '',
    mostWickets: '',
    playerOfTheMatch: ''
  });

  const onChange = e => setResults({ ...results, [e.target.name]: e.target.value });

  // Helper function: if value contains a comma, split into an array.
  const parseValue = (value) => {
    if (value.includes(',')) {
      return value.split(',').map(v => v.trim()).filter(v => v);
    }
    return value;
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // Convert comma-separated values into arrays for tied categories.
      const newResults = {
        winner: results.winner,
        mostSixes: parseValue(results.mostSixes),
        mostFours: parseValue(results.mostFours),
        mostWickets: parseValue(results.mostWickets),
        playerOfTheMatch: results.playerOfTheMatch
      };
      await axios.post(`/admin/match/${matchId}/update`, newResults, {
        headers: { 'x-auth-token': token }
      });
      alert('Results updated and points calculated!');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert(err.response ? err.response.data.msg : 'Error updating results');
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <div className="form-group">
        <label>Match ID:</label>
        <input 
          className="input-field" 
          type="text" 
          value={matchId} 
          onChange={(e) => setMatchId(e.target.value)} 
          placeholder="Enter match ID" 
          required 
        />
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Winner:</label>
          <input 
            className="input-field" 
            type="text" 
            name="winner" 
            value={results.winner} 
            onChange={onChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Most Sixes:</label>
          <input 
            className="input-field" 
            type="text" 
            name="mostSixes" 
            value={results.mostSixes} 
            onChange={onChange} 
            required 
          />
          <small>Enter one or more names separated by commas (e.g., "R Gaikwad, D Conway")</small>
        </div>
        <div className="form-group">
          <label>Most Fours:</label>
          <input 
            className="input-field" 
            type="text" 
            name="mostFours" 
            value={results.mostFours} 
            onChange={onChange} 
            required 
          />
          <small>Enter one or more names separated by commas</small>
        </div>
        <div className="form-group">
          <label>Most Wickets:</label>
          <input 
            className="input-field" 
            type="text" 
            name="mostWickets" 
            value={results.mostWickets} 
            onChange={onChange} 
            required 
          />
          <small>Enter one or more names separated by commas</small>
        </div>
        <div className="form-group">
          <label>Player of the Match:</label>
          <input 
            className="input-field" 
            type="text" 
            name="playerOfTheMatch" 
            value={results.playerOfTheMatch} 
            onChange={onChange} 
            required 
          />
        </div>
        <button className="button" type="submit">Update Results</button>
      </form>
    </div>
  );
}

export default AdminPage;
