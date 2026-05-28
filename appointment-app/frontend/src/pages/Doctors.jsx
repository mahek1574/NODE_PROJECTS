import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, Star, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [specialty, setSpecialty] = useState('All');
    const [loading, setLoading] = useState(true);

    const specialties = ['All', 'General Physician', 'Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist', 'Orthopedic'];

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await axios.get('/doctors');
            setDoctors(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = specialty === 'All' || doctor.specialization === specialty;
        return matchesSearch && matchesSpecialty;
    });

    return (
        <div className="doctors-page container section-padding">
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Our Specialized Doctors</h1>
                <p style={{ color: 'var(--text-muted)' }}>Find the right doctor for your health needs</p>
            </div>

        
            <div className="card flex items-center justify-between" style={{ padding: '1rem 2rem', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                    <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                        type="text" 
                        placeholder="Search by doctor or specialty..." 
                        style={{ paddingLeft: '44px', width: '100%', border: '1px solid #E2E8F0' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="flex items-center gap-4" style={{ minWidth: '300px' }}>
                    <Filter size={20} style={{ color: 'var(--text-muted)' }} />
                    <select 
                        style={{ border: '1px solid #E2E8F0', padding: '10px 16px', borderRadius: '8px', width: '100%' }}
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    >
                        {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '5rem' }}>Loading doctors...</div>
            ) : (
                <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {filteredDoctors.map((doctor) => (
                        <motion.div 
                            key={doctor._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
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
                                <div className="flex-col gap-1" style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                    <div className="flex items-center gap-2"><Clock size={14} /> {doctor.experience} experience</div>
                                    <div className="flex items-center gap-2"><MapPin size={14} /> Available: {doctor.timings}</div>
                                </div>
                                <div style={{ borderTop: '1px solid var(--border-color)', margin: '1rem 0', paddingTop: '1rem' }} className="flex justify-between items-center">
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>${doctor.fees}</span>
                                    <Link to={`/doctors/${doctor._id}`} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {filteredDoctors.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem' }}>
                            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>No doctors found matching your search.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Doctors;
