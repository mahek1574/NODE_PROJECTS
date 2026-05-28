const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { adminMiddleware } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.post('/', adminMiddleware, upload.single('image'), doctorController.addDoctor);
router.put('/:id', adminMiddleware, upload.single('image'), doctorController.updateDoctor);
router.delete('/:id', adminMiddleware, doctorController.deleteDoctor);

module.exports = router;
