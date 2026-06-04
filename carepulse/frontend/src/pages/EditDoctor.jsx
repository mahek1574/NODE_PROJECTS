import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Edit, Image as ImageIcon, Briefcase, GraduationCap, DollarSign, Clock, Calendar } from 'lucide-react';

const EditDoctor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        experience: '',
        fees: '',
        about: '',
        timings: '',
        availableDays: ''
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await axios.get(`/doctors/${id}`);
                const doc = res.data;
                setFormData({
                    name: doc.name || '',
                    specialization: doc.specialization || '',
                    experience: doc.experience || '',
                    fees: doc.fees || '',
                    about: doc.about || '',
                    timings: doc.timings || '',
                    availableDays: Array.isArray(doc.availableDays) ? doc.availableDays.join(', ') : (doc.availableDays || '')
                });
                if (doc.image) {
                    setPreview(`http://localhost:5000/uploads/${doc.image}`);
                }
            } catch (error) {
                alert('Error loading doctor details');
                navigate('/admin/manage-doctors');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);

        try {
            await axios.put(`/doctors/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/admin/manage-doctors');
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating doctor');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading Doctor Details...</div>;

    return (
        <div className="add-doctor container section-padding">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card" 
                style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}
            >
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Edit Doctor Profile</h2>

                <form onSubmit={handleSubmit}>
                    <div className="flex-col items-center gap-4" style={{ marginBottom: '2.5rem' }}>
                        <div style={{ 
                            width: '150px', 
                            height: '150px', 
                            borderRadius: '16px', 
                            background: '#F1F5F9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            border: '2px dashed var(--border-color)',
                            cursor: 'pointer',
                            position: 'relative'
                        }} onClick={() => document.getElementById('doctor-image').click()}>
                            {preview ? (
                                <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ textAlign: 'center' }}>
                                    <ImageIcon size={40} style={{ color: 'var(--text-muted)' }} />
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>Doctor Photo</p>
                                </div>
                            )}
                        </div>
                        <input id="doctor-image" type="file" hidden accept="image/*" onChange={handleImageChange} />
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click photo to upload new image (Optional)</p>
                    </div>

                    <div className="grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="input-group">
                            <label>Doctor Name</label>
                            <input name="name" type="text" placeholder="Dr. Smith" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Specialization</label>
                            <select name="specialization" value={formData.specialization} onChange={handleChange} required>
                                <option value="">Select Specialty</option>
                                <option value="General Physician">General Physician</option>
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Orthopedic">Orthopedic</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Experience (Years)</label>
                            <input name="experience" type="text" placeholder="e.g. 10 Years" value={formData.experience} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Consultation Fees ($)</label>
                            <input name="fees" type="number" placeholder="50" value={formData.fees} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Available Timings</label>
                            <input name="timings" type="text" placeholder="e.g. 09:00 AM - 05:00 PM" value={formData.timings} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Available Days (Comma separated)</label>
                            <input name="availableDays" type="text" placeholder="Mon, Tue, Wed" value={formData.availableDays} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>About Doctor</label>
                        <textarea name="about" rows="5" placeholder="Biography and details..." value={formData.about} onChange={handleChange} required></textarea>
                    </div>

                    <div className="flex gap-4" style={{ marginTop: '1rem' }}>
                        <button type="button" onClick={() => navigate(-1)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={saving}>
                            {saving ? 'Saving Changes...' : 'Save Profile Changes'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditDoctor;
