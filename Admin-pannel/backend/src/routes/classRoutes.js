import express from 'express';
import {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
} from '../controllers/classController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin', 'teacher', 'student'), getClasses)
  .post(protect, authorize('admin'), createClass);

router.route('/:id')
  .put(protect, authorize('admin'), updateClass)
  .delete(protect, authorize('admin'), deleteClass);

export default router;
