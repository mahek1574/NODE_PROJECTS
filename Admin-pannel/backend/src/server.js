import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import classRoutes from './routes/classRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();


connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const registerDefaultAdmin = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('No users found.');
      await User.create({
        name: 'System Admin',
        email: 'admin@campuscore.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Default admin created successfully: admin@campuscore.com / admin123');
    }
  } catch (error) {
    console.error('Error creating default admin:', error.message);
  }
};
registerDefaultAdmin();
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/dashboard', dashboardRoutes);


app.get('/', (req, res) => {
  res.send('CampusCore API is running...');
})
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
