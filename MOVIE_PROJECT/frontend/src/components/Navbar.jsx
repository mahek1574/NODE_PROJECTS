import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authAPI } from '../services/api';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const res = await authAPI.status();
      if (res.data.loggedIn) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🎬 MovieHub</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/movies">Browse</Link></li>
        {user ? (
          <>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/add-movie">Add Movie</Link></li>
            <li><span className="user-name">Hi, {user.name}</span></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
