import { useState, useEffect } from 'react';
import { wishlistAPI } from '../services/api';
import MovieCard from '../components/MovieCard';

const Wishlist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await wishlistAPI.getWishlist();
      setMovies(res.data.movies);
    } catch (err) {
      console.error('Error fetching wishlist', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleWishlist = async (id) => {
    try {
      await wishlistAPI.toggle(id);
      fetchWishlist(); // Refresh list
    } catch (err) {
      alert('Error updating wishlist');
    }
  };

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-grid">
          {movies.length > 0 ? (
            movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onToggleWishlist={handleToggleWishlist} />
            ))
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
