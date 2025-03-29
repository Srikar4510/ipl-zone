import React, { useState, useEffect } from 'react';
import axios from "../utils/axios"; 
import { useParams, useNavigate } from 'react-router-dom';
import "./MatchPrediction.css";

function MatchPrediction() {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [formData, setFormData] = useState({
    winner: '',
    mostSixes: '',
    mostFours: '',
    mostWickets: '',
    playerOfTheMatch: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/match/${matchId}`, {
          headers: { 'x-auth-token': token }
        });
        setMatch(res.data);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };
    fetchMatch();
  }, [matchId]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/match/predict/${matchId}`, formData, {
        headers: { 'x-auth-token': token }
      });
      alert('Prediction submitted!');
      navigate('/');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert(err.response ? err.response.data.msg : 'Error submitting prediction');
    }
  };

  return (
    <div className="match-prediction-container">
      <h2>Make Your Predictions</h2>
      {match ? (
        <div>
          <h3>Today's Match: {match.team1} vs {match.team2}</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Winner:</label>
              <select name="winner" value={formData.winner} onChange={onChange} required>
                <option value="">Select Winner</option>
                <option value={match.team1}>{match.team1}</option>
                <option value={match.team2}>{match.team2}</option>
              </select>
            </div>
            {["mostSixes", "mostFours", "mostWickets", "playerOfTheMatch"].map((category) => (
              <div key={category} className="form-group category-group">
                <h4>{category === "playerOfTheMatch" ? "Player of the Match" : category.replace(/([A-Z])/g, ' $1')}</h4>
                <div className="squad-container">
                  <div className="squad-column">
                    <h5>{match.team1}</h5>
                    {match.squads && match.squads[match.team1] && match.squads[match.team1].map((player) => (
                      <div key={player.name}>
                        <label>
                          <input
                            type="radio"
                            name={category}
                            value={player.name}
                            checked={formData[category] === player.name}
                            onChange={onChange}
                          />{" "}
                          {player.name} <em>({player.role})</em>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="squad-column">
                    <h5>{match.team2}</h5>
                    {match.squads && match.squads[match.team2] && match.squads[match.team2].map((player) => (
                      <div key={player.name}>
                        <label>
                          <input
                            type="radio"
                            name={category}
                            value={player.name}
                            checked={formData[category] === player.name}
                            onChange={onChange}
                          />{" "}
                          {player.name} <em>({player.role})</em>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button className="button" type="submit">Submit Predictions</button>
          </form>
        </div>
      ) : (
        <p>Loading match details...</p>
      )}
    </div>
  );
}

export default MatchPrediction;
