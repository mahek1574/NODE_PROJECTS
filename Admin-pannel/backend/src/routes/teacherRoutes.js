import express from 'express';
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherDashboardDetails,
} from '../controllers/teacherController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getTeachers)
  .post(protect, authorize('admin'), createTeacher);

router.route('/dashboard-details')
  .get(protect, authorize('teacher'), getTeacherDashboardDetails);

router.route('/:id')
  .put(protect, authorize('admin'), updateTeacher)
  .delete(protect, authorize('admin'), deleteTeacher);

export default router;
