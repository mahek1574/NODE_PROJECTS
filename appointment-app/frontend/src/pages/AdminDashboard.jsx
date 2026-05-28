import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, Calendar, UserPlus, Activity, TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        doctors: 0,
        appointments: 0,
        users: 0,
        pending: 0
    });
    const [recentAppointments, setRecentAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [docs, apps, users] = await Promise.all([
                    axios.get('/doctors'),
                    axios.get('/appointments/all'),
                    axios.get('/users')
                ]);

                setStats({
                    doctors: docs.data.length,
                    appointments: apps.data.length,
                    users: users.data.length,
                    pending: apps.data.filter(a => a.status === 'Pending').length
                });

                setRecentAppointments(apps.data.slice(0, 5));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`/appointments/${id}`, { status });
            // Refresh data
            window.location.reload();
        } catch (error) {
            alert('Error updating status');
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading Dashboard...</div>;

    return (
        <div className="admin-dashboard container section-padding">
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Admin Dashboard</h1>
                <p style={{ color: 'var(--text-muted)' }}>Overview of CarePulse performance and management</p>
            </div>

    
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card" style={{ padding: '1.5rem', borderLeft: '5px solid var(--primary)' }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Total Doctors</p>
                            <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{stats.doctors}</h2>
                        </div>
                        <div style={{ background: '#E0F2FE', padding: '12px', borderRadius: '12px', color: 'var(--primary)' }}><Activity size={24} /></div>
                    </div>
                </div>
                <div className="card" style={{ padding: '1.5rem', borderLeft: '5px solid #10B981' }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Total Appointments</p>
                            <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{stats.appointments}</h2>
                        </div>
                        <div style={{ background: '#DCFCE7', padding: '12px', borderRadius: '12px', color: '#10B981' }}><Calendar size={24} /></div>
                    </div>
                </div>
                <div className="card" style={{ padding: '1.5rem', borderLeft: '5px solid #F59E0B' }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Total Users</p>
                            <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{stats.users}</h2>
                        </div>
                        <div style={{ background: '#FEF3C7', padding: '12px', borderRadius: '12px', color: '#F59E0B' }}><Users size={24} /></div>
                    </div>
                </div>
                <div className="card" style={{ padding: '1.5rem', borderLeft: '5px solid #EF4444' }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Pending Requests</p>
                            <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{stats.pending}</h2>
                        </div>
                        <div style={{ background: '#FEE2E2', padding: '12px', borderRadius: '12px', color: '#EF4444' }}><Clock size={24} /></div>
                    </div>
                </div>
            </div>

            <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
    
                <div style={{ flex: '2', minWidth: '400px' }}>
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem' }}>Recent Appointments</h3>
                            <Link to="/admin/appointments" style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600 }}>View All</Link>
                        </div>
                        
                        <div className="table-responsive" style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ textAlign: 'left', background: '#F8FAFC' }}>
                                    <tr>
                                        <th style={{ padding: '12px 15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Patient</th>
                                        <th style={{ padding: '12px 15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Doctor</th>
                                        <th style={{ padding: '12px 15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Date/Time</th>
                                        <th style={{ padding: '12px 15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Status</th>
                                        <th style={{ padding: '12px 15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentAppointments.map(app => (
                                        <tr key={app._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '15px' }}>
                                                <div style={{ fontWeight: 600 }}>{app.userId?.name || 'Deleted Patient'}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.userId?.phone || 'N/A'}</div>
                                            </td>
                                            <td style={{ padding: '15px' }}>{app.doctorId ? `Dr. ${app.doctorId.name}` : 'Deleted Doctor'}</td>
                                            <td style={{ padding: '15px' }}>
                                                <div>{app.date}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.time}</div>
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                <span className={`badge badge-${app.status.toLowerCase()}`}>{app.status}</span>
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                {app.status === 'Pending' && (
                                                    <div className="flex gap-2">
                                                        <button onClick={() => updateStatus(app._id, 'Approved')} style={{ color: '#10B981' }} title="Approve"><CheckCircle size={20} /></button>
                                                        <button onClick={() => updateStatus(app._id, 'Cancelled')} style={{ color: '#EF4444' }} title="Cancel"><XCircle size={20} /></button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

        
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Quick Actions</h3>
                        <div className="flex-col gap-3">
                            <Link to="/admin/add-doctor" className="btn btn-outline" style={{ justifyContent: 'flex-start', width: '100%' }}>
                                <UserPlus size={18} /> Add New Doctor
                            </Link>
                            <Link to="/admin/manage-doctors" className="btn btn-outline" style={{ justifyContent: 'flex-start', width: '100%' }}>
                                <Activity size={18} /> Manage Doctors
                            </Link>
                            <Link to="/admin/users" className="btn btn-outline" style={{ justifyContent: 'flex-start', width: '100%' }}>
                                <Users size={18} /> View Registered Users
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
