import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Doctors from './pages/Doctors';
import DoctorDetails from './pages/DoctorDetails';
import MyAppointments from './pages/MyAppointments';
import AdminDashboard from './pages/AdminDashboard';
import AddDoctor from './pages/AddDoctor';
import EditDoctor from './pages/EditDoctor';
import DoctorDashboard from './pages/DoctorDashboard';
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false, doctorOnly = false }) => {
    const { user, loading } = useAuth();

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading...</div>;
    
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    if (doctorOnly && user.role !== 'doctor') {
        return <Navigate to="/" />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Navbar />
                    <main style={{ minHeight: 'calc(100vh - 80px)' }}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/doctors" element={<Doctors />} />
                            <Route path="/doctors/:id" element={<DoctorDetails />} />
                            
                
                            <Route path="/my-appointments" element={
                                <ProtectedRoute>
                                    <MyAppointments />
                                </ProtectedRoute>
                            } />

                
                            <Route path="/admin/dashboard" element={
                                <ProtectedRoute adminOnly={true}>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            } />
                            
                            <Route path="/doctor/dashboard" element={
                                <ProtectedRoute doctorOnly={true}>
                                    <DoctorDashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/admin/add-doctor" element={
                                <ProtectedRoute adminOnly={true}>
                                    <AddDoctor />
                                </ProtectedRoute>
                            } />
                            <Route path="/admin/edit-doctor/:id" element={
                                <ProtectedRoute adminOnly={true}>
                                    <EditDoctor />
                                </ProtectedRoute>
                            } />
                            <Route path="/admin/manage-doctors" element={
                                <ProtectedRoute adminOnly={true}>
                                    <Doctors />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </main>
                    <footer style={{ background: 'white', padding: '3rem 0', borderTop: '1px solid var(--border-color)', marginTop: '4rem' }}>
                        <div className="container flex justify-between items-center">
                            <div>
                                <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>CarePulse</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Making healthcare accessible and easy for everyone.</p>
                            </div>
                            <div className="flex gap-8">
                                <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Home</Link>
                                <Link to="/doctors" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Doctors</Link>
                                <Link to="/about" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>About Us</Link>
                            </div>
                        </div>
                        <div className="container" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #F1F5F9', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            &copy; {new Date().getFullYear()} CarePulse. All rights reserved.
                        </div>
                    </footer>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
