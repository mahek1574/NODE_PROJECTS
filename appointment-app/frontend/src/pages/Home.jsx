import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Clock, Award, Star } from 'lucide-react';

const Home = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get('/doctors');
                setDoctors(res.data.slice(0, 4)); // Show first 4 doctors
            } catch (error) {
                console.error(error);
            }
        };
        fetchDoctors();
    }, []);

    return (
        <div className="home-page">
    
            <section className="hero section-padding" style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)' }}>
                <div className="container flex items-center justify-between">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hero-content" style={{ maxWidth: '600px' }}
                    >
                        <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Welcome to CarePulse</span>
                        <h1 style={{ fontSize: '3.5rem', marginTop: '1rem', lineHeight: 1.1 }}>Find & Book Your <span style={{ color: 'var(--primary)' }}>Specialist</span> Doctor</h1>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', margin: '1.5rem 0 2.5rem' }}>
                            Access top-rated doctors across all specialties. Schedule your appointment in seconds and manage your healthcare journey with ease.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/doctors" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                                Book Appointment <ArrowRight size={18} />
                            </Link>
                            <Link to="/about" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                                Learn More
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="hero-image"
                    >
                        <img src="https://img.freepik.com/free-photo/doctor-offering-medical-teleconsultation_23-2149329007.jpg?t=st=1715406000~exp=1715409600~hmac=6b9e5b7b8c8d8e8f9a9b9c9d9e9f9a9b9c9d9e9f9a9b9c9d9e9f9a9b9c9d9e9f" 
                             alt="Doctor" 
                             style={{ width: '500px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                        />
                    </motion.div>
                </div>
            </section>

    
            <section className="features section-padding container">
                <div className="flex justify-between gap-8">
                    <div className="card flex-col items-center text-center" style={{ padding: '2rem', flex: 1 }}>
                        <div style={{ background: '#E0F2FE', padding: '1rem', borderRadius: '16px', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                            <ShieldCheck size={32} />
                        </div>
                        <h3>Verified Doctors</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Every doctor is strictly verified before joining our platform.</p>
                    </div>
                    <div className="card flex-col items-center text-center" style={{ padding: '2rem', flex: 1 }}>
                        <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: '16px', color: '#10B981', marginBottom: '1.5rem' }}>
                            <Clock size={32} />
                        </div>
                        <h3>24/7 Booking</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Book your appointment anytime, anywhere at your convenience.</p>
                    </div>
                    <div className="card flex-col items-center text-center" style={{ padding: '2rem', flex: 1 }}>
                        <div style={{ background: '#FEF3C7', padding: '1rem', borderRadius: '16px', color: '#F59E0B', marginBottom: '1.5rem' }}>
                            <Award size={32} />
                        </div>
                        <h3>Top Specialists</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Access to high-ranked specialists across various medical fields.</p>
                    </div>
                </div>
            </section>

        
            <section className="doctors-preview section-padding" style={{ background: 'white' }}>
                <div className="container">
                    <div className="flex justify-between items-end" style={{ marginBottom: '3rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem' }}>Our Top Specialists</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Check out some of our most highly-rated medical professionals.</p>
                        </div>
                        <Link to="/doctors" className="btn btn-outline" style={{ color: 'var(--primary)', borderColor: 'var(--primary)' }}>
                            View All Doctors
                        </Link>
                    </div>

                    <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                        {doctors.map((doctor) => (
                            <motion.div 
                                key={doctor._id}
                                whileHover={{ y: -10 }}
                                className="card"
                            >
                                <img 
                                    src={`http://localhost:5000/uploads/${doctor.image}`} 
                                    alt={doctor.name} 
                                    style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                                />
                                <div style={{ padding: '1.5rem' }}>
                                    <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                                        <span className="badge badge-approved">{doctor.specialization}</span>
                                        <div className="flex items-center gap-1" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                                            <Star size={16} fill="#F59E0B" color="#F59E0B" /> 4.9
                                        </div>
                                    </div>
                                    <h4 style={{ fontSize: '1.25rem' }}>Dr. {doctor.name}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{doctor.experience} experience</p>
                                    <div style={{ borderTop: '1px solid var(--border-color)', margin: '1rem 0', paddingTop: '1rem' }} className="flex justify-between items-center">
                                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>${doctor.fees}</span>
                                        <Link to={`/doctors/${doctor._id}`} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
