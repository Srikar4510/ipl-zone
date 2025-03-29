import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Home.css";

const Home = () => {
  const [scheduleData, setScheduleData] = useState({
    schedules: [],
    currentPage: 1,
    totalPages: 1
  });
  const [loading, setLoading] = useState(false);

  const fetchSchedule = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/schedule?page=${page}&limit=3`);
      if (page === 1) {
        setScheduleData(res.data);
      } else {
        setScheduleData(prev => ({
          schedules: [...prev.schedules, ...res.data.schedules],
          currentPage: res.data.currentPage,
          totalPages: res.data.totalPages
        }));
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSchedule(1);
  }, []);

  const loadMore = () => {
    const nextPage = scheduleData.currentPage + 1;
    if (nextPage <= scheduleData.totalPages) {
      fetchSchedule(nextPage);
    }
  };

  // Check if predictions are open (match start in future)
  const canPredict = (match) => {
    const matchDateTime = new Date(`${match.date}T${match.time}:00`);
    return new Date() < matchDateTime;
  };

  return (
    <div className="home-container">
      <h1>IPL Competition Schedule</h1>
      <div className="matches-container">
        {scheduleData.schedules.length > 0 ? (
          scheduleData.schedules.map(match => (
            <div key={match.id} className="match-card">
              <h3>{match.teams}</h3>
              <p>
                {match.date} at {match.time}<br />Venue: {match.venue}
              </p>
              {canPredict(match) ? (
                <Link to={`/match/${match.id}`}>
                  <button className="button">Make Prediction</button>
                </Link>
              ) : (
                <button className="button" disabled>
                  Prediction Closed
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No upcoming matches.</p>
        )}
      </div>
      {scheduleData.currentPage < scheduleData.totalPages && (
        <div className="load-more-container">
          <button className="button" onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
