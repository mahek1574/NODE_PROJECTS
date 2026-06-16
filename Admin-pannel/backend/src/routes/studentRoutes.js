import express from 'express';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentDashboardDetails,
} from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getStudents)
  .post(protect, authorize('admin'), createStudent);

router.route('/dashboard-details')
  .get(protect, authorize('student'), getStudentDashboardDetails);

router.route('/:id')
  .put(protect, authorize('admin'), updateStudent)
  .delete(protect, authorize('admin'), deleteStudent);

export default router;
