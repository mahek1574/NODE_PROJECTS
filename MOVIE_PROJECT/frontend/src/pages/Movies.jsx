import { useState, useEffect } from 'react';
import { movieAPI, wishlistAPI } from '../services/api';
import MovieCard from '../components/MovieCard';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, [search, category]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await movieAPI.getMovies({ search, category });
      setMovies(res.data.movies);
    } catch (err) {
      console.error('Error fetching movies', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleWishlist = async (id) => {
    try {
      await wishlistAPI.toggle(id);
      alert('Wishlist updated!');
    } catch (err) {
      alert('Please login to use wishlist');
    }
  };

  return (
    <div className="movies-page">
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search movies..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="search-input"
        />
        <div className="category-buttons">
          {['All Categories', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror'].map(cat => {
            const catValue = cat === 'All Categories' ? '' : cat;
            return (
              <button 
                key={cat} 
                className={`category-btn ${category === catValue ? 'active' : ''}`}
                onClick={() => setCategory(catValue)}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="movie-grid">
          {movies.length > 0 ? (
            movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onToggleWishlist={handleToggleWishlist} />
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
