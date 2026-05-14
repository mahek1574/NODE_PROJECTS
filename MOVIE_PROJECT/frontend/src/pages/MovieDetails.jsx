import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieAPI, wishlistAPI } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const res = await movieAPI.getDetails(id);
      setMovie(res.data.movie);
    } catch (err) {
      console.error('Error fetching movie details', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await movieAPI.deleteMovie(id);
        navigate('/movies');
      } catch (err) {
        alert('Error deleting movie');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-details-page">
      <div className="details-container">
        <div className="details-image">
          <img 
            src={movie.image ? `http://localhost:5000/uploads/${movie.image}` : 'https://via.placeholder.com/400x600?text=No+Image'} 
            alt={movie.title} 
          />
        </div>
        <div className="details-info">
          <h1>{movie.title}</h1>
          <p className="description">{movie.description}</p>
          <div className="meta-info">
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Category:</strong> {movie.category}</p>
            <p><strong>Rating:</strong> ⭐ {movie.rating}</p>
          </div>
          <div className="actions">
            <button onClick={() => navigate(`/edit-movie/${movie._id}`)} className="edit-btn">Edit</button>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
            <button onClick={() => navigate('/movies')} className="back-btn">Back to Movies</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
