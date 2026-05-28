const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { adminMiddleware } = require('../middleware/auth');

router.get('/', adminMiddleware, userController.getAllUsers);

module.exports = router;
