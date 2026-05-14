import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onToggleWishlist }) => {
  return (
    <div className="movie-card">
      <div className="movie-image">
        <img 
          src={movie.image ? `http://localhost:5000/uploads/${movie.image}` : 'https://via.placeholder.com/200x300?text=No+Image'} 
          alt={movie.title} 
        />
        <button className="wishlist-icon" onClick={() => onToggleWishlist(movie._id)}>
          ❤️
        </button>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="movie-meta">{movie.year} | {movie.category}</p>
        <div className="movie-rating">⭐ {movie.rating}</div>
        <Link to={`/movie/${movie._id}`} className="view-details">View Details</Link>
      </div>
    </div>
  );
};

export default MovieCard;
