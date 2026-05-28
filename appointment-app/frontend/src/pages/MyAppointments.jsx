import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MessageSquare, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get('/appointments/my-appointments');
            setAppointments(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if (window.confirm("Are you sure you want to cancel this appointment?")) {
            try {
                await axios.put(`/appointments/${id}`, { status: 'Cancelled' });
                await fetchAppointments();
            } catch (error) {
                alert(error.response?.data?.message || 'Error cancelling appointment');
            }
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved': return <CheckCircle size={18} color="#059669" />;
            case 'Cancelled': return <XCircle size={18} color="#DC2626" />;
            case 'Completed': return <CheckCircle size={18} color="#2563EB" />;
            default: return <AlertCircle size={18} color="#D97706" />;
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading appointments...</div>;

    return (
        <div className="my-appointments container section-padding">
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>My Appointments</h1>
                <p style={{ color: 'var(--text-muted)' }}>Track and manage your scheduled medical visits</p>
            </div>

            <div className="flex-col gap-6">
                {appointments.length > 0 ? (
                    appointments.map((app) => (
                        <motion.div 
                            key={app._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card flex justify-between items-center" 
                            style={{ padding: '1.5rem 2.5rem', flexWrap: 'wrap', gap: '2rem' }}
                        >
                            <div className="flex items-center gap-6">
                                <img 
                                    src={app.doctorId?.image ? `http://localhost:5000/uploads/${app.doctorId.image}` : 'http://localhost:5000/uploads/default-profile.png'} 
                                    alt={app.doctorId?.name || 'Deleted Doctor'} 
                                    style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }}
                                />
                                <div>
                                    <h3 style={{ fontSize: '1.25rem' }}>{app.doctorId ? `Dr. ${app.doctorId.name}` : 'N/A'}</h3>
                                    <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>{app.doctorId?.specialization || 'General Care'}</p>
                                    <div className="flex items-center gap-4 mt-2" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {app.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {app.time}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-col gap-2" style={{ maxWidth: '300px' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Symptoms</span>
                                <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>"{app.symptoms}"</p>
                            </div>

                            <div className="flex-col items-end gap-3">
                                <div className="flex items-center gap-2">
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Status:</span>
                                    <div className={`badge badge-${app.status.toLowerCase()} flex items-center gap-1`}>
                                        {getStatusIcon(app.status)} {app.status}
                                    </div>
                                </div>
                                {app.status === 'Pending' && (
                                    <button 
                                        onClick={() => handleCancel(app._id)}
                                        className="btn btn-outline" 
                                        style={{ padding: '6px 16px', fontSize: '0.8rem', color: '#DC2626', borderColor: '#FEE2E2' }}
                                    >
                                        Cancel Appointment
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="card" style={{ textAlign: 'center', padding: '5rem' }}>
                        <Calendar size={48} style={{ color: 'var(--border-color)', marginBottom: '1rem' }} />
                        <h3>No Appointments Found</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>You haven't booked any appointments yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAppointments;
