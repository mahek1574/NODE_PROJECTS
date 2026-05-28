import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Calendar, LayoutDashboard, PlusCircle, Users, Activity } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container flex items-center justify-between">
                <Link to="/" className="nav-logo">
                    <Activity size={28} />
                    <span>CarePulse</span>
                </Link>

                <div className="flex items-center gap-8">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/doctors" className="nav-link">Find Doctors</Link>
                    
                    {user ? (
                        <div className="flex items-center gap-6">
                            {user.role === 'admin' && (
                                <Link to="/admin/dashboard" className="nav-link">
                                    <LayoutDashboard size={18} /> Dashboard
                                </Link>
                            )}
                            {user.role === 'doctor' && (
                                <Link to="/doctor/dashboard" className="nav-link">
                                    <LayoutDashboard size={18} /> Dashboard
                                </Link>
                            )}
                            {user.role === 'user' && (
                                <Link to="/my-appointments" className="nav-link">
                                    <Calendar size={18} /> My Appointments
                                </Link>
                            )}
                            
                            <div className="user-profile-section">
                                <div className="user-profile-group">
                                    <img 
                                        src={user.image.startsWith('http') ? user.image : `http://localhost:5000/uploads/${user.image}`} 
                                        alt={user.name} 
                                        className="user-avatar"
                                    />
                                    <span className="user-name">{user.name.split(' ')[0]}</span>
                                </div>
                                <button onClick={handleLogout} className="btn-outline" style={{ padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="btn btn-outline" style={{ padding: '8px 24px' }}>Login</Link>
                            <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 24px' }}>Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
