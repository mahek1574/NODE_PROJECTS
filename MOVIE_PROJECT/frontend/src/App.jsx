import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Wishlist from './pages/Wishlist';
import History from './pages/History';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/history" element={<History />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/edit-movie/:id" element={<EditMovie />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
