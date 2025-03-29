import React, { useState } from 'react';
import axios from 'axios';
import "./AdminPredictions.css";

const AdminPredictions = () => {
  const [matchId, setMatchId] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchPredictions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/match/${matchId}/predictions`, {
        headers: { 'x-auth-token': token }
      });
      setPredictions(res.data);
      setMessage('');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setMessage(err.response ? err.response.data.msg : 'Error fetching predictions');
    }
  };

  return (
    <div className="admin-predictions-container">
  <h2>Match Predictions</h2>
  <div className="admin-predictions-input-group">
    <input
      type="text"
      placeholder="Enter Match Schedule ID"
      value={matchId}
      onChange={(e) => setMatchId(e.target.value)}
      className="admin-predictions-input"
    />
    <button onClick={fetchPredictions} className="admin-predictions-button">
      Get Predictions
    </button>
  </div>

  {message && <p className="admin-predictions-error">{message}</p>}

  {predictions.length > 0 && (
    <table className="admin-predictions-table">
      <thead>
        <tr>
          <th>User Email</th>
          <th>Username</th>
          <th>Winner</th>
          <th>Most Sixes</th>
          <th>Most Fours</th>
          <th>Most Wickets</th>
          <th>Player of the Match</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {predictions.map((pred) => (
          <tr key={pred._id}>
            
            <td className="prediction-email">{pred.user.email}</td>
            <td>{pred.user.username}</td>
            <td>{pred.winner}</td>
            <td>{pred.mostSixes}</td>
            <td>{pred.mostFours}</td>
            <td>{pred.mostWickets}</td>
            <td>{pred.playerOfTheMatch}</td>
            <td>{pred.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

  );
};

export default AdminPredictions;
