import { useState, useEffect } from 'react';
import { historyAPI } from '../services/api';
import { Link } from 'react-router-dom';

const History = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await historyAPI.getHistory();
      setMovies(res.data.movies);
    } catch (err) {
      console.error('Error fetching history', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm('Clear all watch history?')) {
      try {
        await historyAPI.clear();
        setMovies([]);
      } catch (err) {
        alert('Error clearing history');
      }
    }
  };

  return (
    <div className="history-page">
      <div className="header">
        <h1>Watch History</h1>
        {movies.length > 0 && <button onClick={handleClearHistory} className="clear-btn">Clear History</button>}
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="history-list">
          {movies.length > 0 ? (
            movies.map(movie => (
              <div key={movie._id} className="history-item">
                <img src={`http://localhost:5000/uploads/${movie.image}`} alt={movie.title} />
                <div className="history-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.category}</p>
                  <Link to={`/movie/${movie._id}`}>View Again</Link>
                </div>
              </div>
            ))
          ) : (
            <p>No watch history found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
