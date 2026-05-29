import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Activity, Calendar, CheckCircle, Clock, XCircle, Users, TrendingUp, Info } from 'lucide-react';

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%23F1F5F9'/><circle cx='50' cy='38' r='20' fill='%23CBD5E1'/><path d='M15 85 C 15 65, 85 65, 85 85' fill='%23CBD5E1'/></svg>";

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        completed: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctorData();
    }, []);

    const fetchDoctorData = async () => {
        try {
            const res = await axios.get('/appointments/doctor');
            const data = res.data;
            setAppointments(data);

            setStats({
                total: data.length,
                pending: data.filter(a => a.status === 'Pending').length,
                approved: data.filter(a => a.status === 'Approved').length,
                completed: data.filter(a => a.status === 'Completed').length
            });
        } catch (error) {
            console.error('Error fetching doctor dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`/appointments/${id}`, { status });
            // Refresh dashboard data
            await fetchDoctorData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating appointment status');
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved': return <CheckCircle size={16} color="#059669" />;
            case 'Cancelled': return <XCircle size={16} color="#DC2626" />;
            case 'Completed': return <CheckCircle size={16} color="#2563EB" />;
            default: return <Clock size={16} color="#D97706" />;
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading Doctor Dashboard...</div>;

    return (
        <div className="doctor-dashboard container section-padding">
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Doctor Dashboard</h1>
                <p style={{ color: 'var(--text-muted)' }}>Welcome back! Manage your schedule and patient visits.</p>
            </div>

            {/* Statistics Row */}
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card" style={{ padding: '1.5rem', borderLeft: '5px solid var(--primary)' }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Total Appointments</p>
                            <h2 style={{ fontSize: '2.2rem', margin: '0.5rem 0' }}>{stats.total}</h2>
                        </div>
                        <div style={{ background: '#E0F2FE', padding: '12px', borderRadius: '12px', color: 'var(--primary)' }}>
                            <Calendar size={24} />
                        </div>
                    </div>
                </div>

                <div className="card" style={{ padding: '1.5rem', borderLeft: '5px solid #F59E0B' }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Pending Appointments</p>
                            <h2 style={{ fontSize: '2.2rem', margin: '0.5rem 0' }}>{stats.pending}</h2>
                        </div>
                        <div style={{ background: '#FEF3C7', padding: '12px', borderRadius: '12px', color: '#F59E0B' }}>
                            <Clock size={24} />
                        </div>
                    </div>
                </div>

                <div className="card" style={{ padding: '1.5rem', borderLeft: '5px solid #10B981' }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Approved Appointments</p>
                            <h2 style={{ fontSize: '2.2rem', margin: '0.5rem 0' }}>{stats.approved}</h2>
                        </div>
                        <div style={{ background: '#DCFCE7', padding: '12px', borderRadius: '12px', color: '#10B981' }}>
                            <CheckCircle size={24} />
                        </div>
                    </div>
                </div>

                <div className="card" style={{ padding: '1.5rem', borderLeft: '5px solid #2563EB' }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Completed Appointments</p>
                            <h2 style={{ fontSize: '2.2rem', margin: '0.5rem 0' }}>{stats.completed}</h2>
                        </div>
                        <div style={{ background: '#DBEAFE', padding: '12px', borderRadius: '12px', color: '#2563EB' }}>
                            <Activity size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Schedule List */}
            <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Your Scheduled Visits</h3>
                
                {appointments.length > 0 ? (
                    <div className="table-responsive" style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ textAlign: 'left', background: '#F8FAFC' }}>
                                <tr>
                                    <th style={{ padding: '12px 15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Patient Name</th>
                                    <th style={{ padding: '12px 15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Date & Time</th>
                                    <th style={{ padding: '12px 15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Symptoms</th>
                                    <th style={{ padding: '12px 15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Status</th>
                                    <th style={{ padding: '12px 15px', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((app) => (
                                    <tr key={app._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '15px' }}>
                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={app.userId?.image && app.userId.image !== 'default-profile.png' ? (app.userId.image.startsWith('http') ? app.userId.image : `http://localhost:5000/uploads/${app.userId.image}`) : DEFAULT_AVATAR} 
                                                    alt={app.userId?.name || 'Deleted Patient'} 
                                                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                                                    onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                                                />
                                                <div>
                                                    <div style={{ fontWeight: 600 }}>{app.userId?.name || 'N/A'}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.userId?.phone || 'N/A'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '15px' }}>
                                            <div style={{ fontWeight: 500 }}>{app.date}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.time}</div>
                                        </td>
                                        <td style={{ padding: '15px', maxWidth: '300px' }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                                                <Info size={14} style={{ color: 'var(--text-muted)', marginTop: '3px', flexShrink: 0 }} />
                                                <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{app.symptoms}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '15px' }}>
                                            <span className={`badge badge-${app.status.toLowerCase()} flex items-center gap-1`} style={{ display: 'inline-flex', width: 'fit-content' }}>
                                                {getStatusIcon(app.status)} {app.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px', textAlign: 'right' }}>
                                            <div className="flex gap-2 justify-end">
                                                {app.status === 'Pending' && (
                                                    <>
                                                        <button 
                                                            onClick={() => updateStatus(app._id, 'Approved')} 
                                                            className="btn btn-primary" 
                                                            style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#10B981' }}
                                                        >
                                                            Approve
                                                        </button>
                                                        <button 
                                                            onClick={() => updateStatus(app._id, 'Cancelled')} 
                                                            className="btn btn-outline" 
                                                            style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#EF4444', borderColor: '#FEE2E2' }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                                {app.status === 'Approved' && (
                                                    <>
                                                        <button 
                                                            onClick={() => updateStatus(app._id, 'Completed')} 
                                                            className="btn btn-primary" 
                                                            style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#2563EB' }}
                                                        >
                                                            Complete
                                                        </button>
                                                        <button 
                                                            onClick={() => updateStatus(app._id, 'Cancelled')} 
                                                            className="btn btn-outline" 
                                                            style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#EF4444', borderColor: '#FEE2E2' }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                                {(app.status === 'Completed' || app.status === 'Cancelled') && (
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No actions</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                        <Calendar size={48} style={{ strokeWidth: '1.5px', marginBottom: '1rem', color: '#CBD5E1' }} />
                        <h4>No Scheduled Appointments</h4>
                        <p style={{ marginTop: '0.25rem' }}>When patients book appointments with you, they will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;
