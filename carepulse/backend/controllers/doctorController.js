const Doctor = require('../models/Doctor');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.addDoctor = async (req, res) => {
    try {
        const { name, email, password, phone, specialization, experience, fees, about, timings, availableDays } = req.body;
        const image = req.file ? req.file.filename : '';

        if (!image) {
            return res.status(400).json({ message: 'Doctor image is required' });
        }

        if (!email || !password || !phone) {
            return res.status(400).json({ message: 'Doctor email, password, and phone are required for login credentials configuration' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'A user or doctor with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            image,
            role: 'doctor'
        });
        await user.save();

        const doctor = new Doctor({
            userId: user._id,
            name,
            specialization,
            experience,
            fees,
            about,
            timings,
            availableDays: Array.isArray(availableDays) ? availableDays : availableDays.split(','),
            image
        });

        await doctor.save();
        res.status(201).json({ message: 'Doctor added successfully', doctor });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const { name, specialization, experience, fees, about, timings, availableDays } = req.body;
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        doctor.name = name || doctor.name;
        doctor.specialization = specialization || doctor.specialization;
        doctor.experience = experience || doctor.experience;
        doctor.fees = fees || doctor.fees;
        doctor.about = about || doctor.about;
        doctor.timings = timings || doctor.timings;
        doctor.availableDays = availableDays ? (Array.isArray(availableDays) ? availableDays : availableDays.split(',')) : doctor.availableDays;

        if (req.file) {
            doctor.image = req.file.filename;
        }

        await doctor.save();
        res.json({ message: 'Doctor updated successfully', doctor });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        if (doctor.userId) {
            await User.findByIdAndDelete(doctor.userId);
        }

        await Doctor.findByIdAndDelete(req.params.id);
        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
