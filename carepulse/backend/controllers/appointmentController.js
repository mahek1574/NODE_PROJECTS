const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

exports.bookAppointment = async (req, res) => {
    try {
        const { doctorId, date, time, symptoms } = req.body;
        const userId = req.session.userId;

        const appointment = new Appointment({
            userId,
            doctorId,
            date,
            time,
            symptoms
        });

        await appointment.save();
        res.status(201).json({ message: 'Appointment booked successfully', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.session.userId })
            .populate('doctorId', 'name specialization image')
            .sort({ createdAt: -1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getDoctorAppointments = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.session.userId });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor profile not found' });
        }

        const appointments = await Appointment.find({ doctorId: doctor._id })
            .populate('userId', 'name email phone image')
            .sort({ createdAt: -1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('userId', 'name email phone')
            .populate('doctorId', 'name specialization')
            .sort({ createdAt: -1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        const { role, userId } = req.session;

    
        if (role === 'user') {
        
            if (appointment.userId.toString() !== userId) {
                return res.status(403).json({ message: 'Forbidden: You can only cancel your own appointments' });
            }
            if (status !== 'Cancelled') {
                return res.status(400).json({ message: 'Bad Request: Patients can only cancel appointments' });
            }
        } else if (role === 'doctor') {
    
            const doctor = await Doctor.findOne({ userId });
            if (!doctor || appointment.doctorId.toString() !== doctor._id.toString()) {
                return res.status(403).json({ message: 'Forbidden: You can only manage your own scheduled appointments' });
            }
        } else if (role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }

        appointment.status = status;
        await appointment.save();

        res.json({ message: `Appointment ${status.toLowerCase()} successfully`, appointment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
