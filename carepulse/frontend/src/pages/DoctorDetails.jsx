import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Calendar, Clock, DollarSign, Award, CheckCircle, Info, Star } from 'lucide-react';

const DoctorDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    
    
    const [bookingData, setBookingData] = useState({
        date: '',
        time: '',
        symptoms: ''
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchDoctor();
    }, [id]);

    const fetchDoctor = async () => {
        try {
            const res = await axios.get(`/doctors/${id}`);
            setDoctor(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setBookingLoading(true);
        try {
            await axios.post('/appointments', {
                doctorId: id,
                ...bookingData
            });
            setSuccess(true);
            setTimeout(() => navigate('/my-appointments'), 2000);
        } catch (error) {
            alert(error.response?.data?.message || 'Error booking appointment');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading doctor details...</div>;
    if (!doctor) return <div style={{ textAlign: 'center', padding: '5rem' }}>Doctor not found</div>;

    return (
        <div className="doctor-details container section-padding">
            <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
        
                <div style={{ flex: '1.5', minWidth: '350px' }}>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card" 
                        style={{ padding: '2rem' }}
                    >
                        <div className="flex gap-8 items-start" style={{ marginBottom: '2rem' }}>
                            <img 
                                src={`http://localhost:5000/uploads/${doctor.image}`} 
                                alt={doctor.name} 
                                style={{ width: '180px', height: '180px', borderRadius: '16px', objectFit: 'cover' }}
                            />
                            <div>
                                <span className="badge badge-approved" style={{ marginBottom: '0.5rem' }}>{doctor.specialization}</span>
                                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dr. {doctor.name}</h1>
                                <div className="flex items-center gap-4" style={{ marginBottom: '1rem' }}>
                                    <div className="flex items-center gap-1" style={{ color: '#F59E0B', fontWeight: 600 }}>
                                        <Star size={18} fill="#F59E0B" /> 4.9 (120+ Reviews)
                                    </div>
                                    <div style={{ color: 'var(--text-muted)' }}>•</div>
                                    <div style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{doctor.experience} Experience</div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2" style={{ background: '#F8FAFC', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem' }}>
                                        <Clock size={16} color="var(--primary)" /> {doctor.timings}
                                    </div>
                                    <div className="flex items-center gap-2" style={{ background: '#F8FAFC', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem' }}>
                                        <DollarSign size={16} color="#10B981" /> ${doctor.fees}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem', display: 'flex', itemsCenter: 'center', gap: '8px' }}>
                                <Info size={20} color="var(--primary)" /> About Doctor
                            </h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>{doctor.about}</p>
                        </div>

                        <div>
                            <h3 style={{ marginBottom: '1rem', display: 'flex', itemsCenter: 'center', gap: '8px' }}>
                                <CheckCircle size={20} color="var(--primary)" /> Available Days
                            </h3>
                            <div className="flex gap-2">
                                {doctor.availableDays.map(day => (
                                    <span key={day} style={{ background: '#E0F2FE', color: 'var(--primary)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                                        {day}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

        
                <div style={{ flex: '1', minWidth: '350px' }}>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="card" 
                        style={{ padding: '2.5rem', position: 'sticky', top: '100px' }}
                    >
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Book Appointment</h3>
                        
                        {success ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <div style={{ color: 'var(--success)', marginBottom: '1rem' }}><CheckCircle size={64} style={{ margin: '0 auto' }} /></div>
                                <h4 style={{ fontSize: '1.25rem' }}>Booking Successful!</h4>
                                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Redirecting to your appointments...</p>
                            </div>
                        ) : user && user.role !== 'user' ? (
                            <div style={{ textAlign: 'center', padding: '2rem 1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                <Info size={40} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Clinical View</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Only patients are permitted to schedule doctor appointments.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleBooking}>
                                <div className="input-group">
                                    <label>Select Date</label>
                                    <div style={{ position: 'relative' }}>
                                        <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <input 
                                            type="date" 
                                            required 
                                            style={{ paddingLeft: '40px' }}
                                            value={bookingData.date}
                                            onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label>Select Time Slot</label>
                                    <div style={{ position: 'relative' }}>
                                        <Clock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <select 
                                            required 
                                            style={{ paddingLeft: '40px' }}
                                            value={bookingData.time}
                                            onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                                        >
                                            <option value="">Choose a time</option>
                                            <option value="09:00 AM">09:00 AM</option>
                                            <option value="10:00 AM">10:00 AM</option>
                                            <option value="11:00 AM">11:00 AM</option>
                                            <option value="02:00 PM">02:00 PM</option>
                                            <option value="03:00 PM">03:00 PM</option>
                                            <option value="04:00 PM">04:00 PM</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label>Symptoms / Reason</label>
                                    <textarea 
                                        rows="4" 
                                        placeholder="Briefly describe your symptoms..."
                                        required
                                        value={bookingData.symptoms}
                                        onChange={(e) => setBookingData({...bookingData, symptoms: e.target.value})}
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary" 
                                    style={{ width: '100%', padding: '14px' }}
                                    disabled={bookingLoading}
                                >
                                    {bookingLoading ? 'Processing...' : 'Confirm Appointment'}
                                </button>
                                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    No immediate payment required. Pay at the clinic.
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;
