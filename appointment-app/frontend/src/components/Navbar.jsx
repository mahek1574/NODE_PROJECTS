import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Calendar, LayoutDashboard, Activity, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        setIsOpen(false);
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
                    <Activity size={28} />
                    <span>CarePulse</span>
                </Link>

                <div className={`nav-right-container ${isOpen ? 'active' : ''}`}>
                    <div className="nav-menu">
                        <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/doctors" className="nav-link" onClick={() => setIsOpen(false)}>Find Doctors</Link>
                        
                        {user && user.role === 'admin' && (
                            <Link to="/admin/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                        )}
                        {user && user.role === 'doctor' && (
                            <Link to="/doctor/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                        )}
                        {user && user.role === 'user' && (
                            <Link to="/my-appointments" className="nav-link" onClick={() => setIsOpen(false)}>
                                <Calendar size={18} /> My Appointments
                            </Link>
                        )}
                    </div>

                    <div className="nav-actions">
                        {user ? (
                            <div className="user-profile-section">
                                <div className="user-profile-group">
                                    <div className="avatar-wrapper">
                                        {(!user.image || user.image === 'default-profile.png') ? (
                                            <div className="user-avatar-placeholder">
                                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                        ) : (
                                            <img 
                                                src={user.image.startsWith('http') ? user.image : `http://localhost:5000/uploads/${user.image}`} 
                                                alt={user.name} 
                                                className="user-avatar"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    const placeholder = document.createElement('div');
                                                    placeholder.className = 'user-avatar-placeholder';
                                                    placeholder.innerText = user.name ? user.name.charAt(0).toUpperCase() : 'U';
                                                    if (e.target.parentNode) {
                                                        e.target.parentNode.insertBefore(placeholder, e.target);
                                                    }
                                                }}
                                            />
                                        )}
                                    </div>
                                    <span className="user-name">{user.name.split(' ')[0]}</span>
                                </div>
                                <button onClick={handleLogout} className="btn-logout" aria-label="Logout">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="auth-buttons">
                                <Link to="/login" className="btn btn-outline" onClick={() => setIsOpen(false)}>Login</Link>
                                <Link to="/signup" className="btn btn-primary" onClick={() => setIsOpen(false)}>Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>

                <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
