import React, { useEffect, useState } from 'react';
import axios from "../utils/axios"; 
import "./Leaderboard.css";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/leaderboard', {
          headers: { 'x-auth-token': token }
        });
        setLeaderboard(res.data);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="table-container">
      <h2 style={{ textAlign: 'center' }}>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={user.username}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
