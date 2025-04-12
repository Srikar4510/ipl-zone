import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import "./MyPredictions.css";

function MyPredictions() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/mypredictions", {
          headers: { "x-auth-token": token }
        });
        setPredictions(res.data);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
      setLoading(false);
    };
    fetchPredictions();
  }, []);

  if (loading) {
    return <div>Loading your predictions...</div>;
  }

  return (
    <div className="mypredictions-container">
      <h2>My Predictions</h2>
      {predictions.length === 0 ? (
        <p>You haven't submitted any predictions yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Match</th>
             
              <th>Prediction</th>
              <th>Points</th>
              <th>Actual Result</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((pred, index) => (
              <tr key={index}>
                <td>{pred.teams}</td>
                
                <td>
                  <div><strong>Winner:</strong> {pred.prediction.winner}</div>
                  <div><strong>Most Sixes:</strong> {pred.prediction.mostSixes}</div>
                  <div><strong>Most Fours:</strong> {pred.prediction.mostFours}</div>
                  <div><strong>Most Wickets:</strong> {pred.prediction.mostWickets}</div>
                  <div><strong>Player of the Match:</strong> {pred.prediction.playerOfTheMatch}</div>
                </td>
                <td>{pred.prediction.points}</td>
                <td>
                  {pred.actualResults && pred.actualResults.winner ? (
                    <div>
                      <div><strong>Winner:</strong> {pred.actualResults.winner}</div>
                      <div><strong>Most Sixes:</strong> {pred.actualResults.mostSixes}</div>
                      <div><strong>Most Fours:</strong> {pred.actualResults.mostFours}</div>
                      <div><strong>Most Wickets:</strong> {pred.actualResults.mostWickets}</div>
                      <div><strong>Player of the Match:</strong> {pred.actualResults.playerOfTheMatch}</div>
                    </div>
                  ) : (
                    "Pending"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyPredictions;
