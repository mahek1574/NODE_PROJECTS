import express from 'express';
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from '../controllers/noticeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin', 'teacher', 'student'), getNotices)
  .post(protect, authorize('admin'), createNotice);

router.route('/:id')
  .put(protect, authorize('admin'), updateNotice)
  .delete(protect, authorize('admin'), deleteNotice);

export default router;
