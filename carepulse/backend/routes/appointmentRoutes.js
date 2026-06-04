const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { authMiddleware, adminMiddleware, doctorMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, appointmentController.bookAppointment);
router.get('/my-appointments', authMiddleware, appointmentController.getMyAppointments);
router.get('/doctor', authMiddleware, doctorMiddleware, appointmentController.getDoctorAppointments);
router.get('/all', adminMiddleware, appointmentController.getAllAppointments);
router.put('/:id', authMiddleware, appointmentController.updateAppointmentStatus);
router.delete('/:id', adminMiddleware, appointmentController.deleteAppointment);

module.exports = router;
