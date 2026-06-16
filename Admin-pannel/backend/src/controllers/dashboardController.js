import User from '../models/User.js';
import Class from '../models/Class.js';
import Subject from '../models/Subject.js';
import Notice from '../models/Notice.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const totalClasses = await Class.countDocuments();
    const totalSubjects = await Subject.countDocuments();

    const recentStudents = await User.find({ role: 'student' })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('name createdAt');

    const recentTeachers = await User.find({ role: 'teacher' })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('name createdAt');

    const recentClasses = await Class.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select('className createdAt');

    const recentNotices = await Notice.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select('title createdAt');


    const activities = [
      ...recentStudents.map(s => ({
        type: 'student',
        message: `Student "${s.name}" was registered`,
        time: s.createdAt,
      })),
      ...recentTeachers.map(t => ({
        type: 'teacher',
        message: `Teacher "${t.name}" was added`,
        time: t.createdAt,
      })),
      ...recentClasses.map(c => ({
        type: 'class',
        message: `Class "${c.className}" was created`,
        time: c.createdAt,
      })),
      ...recentNotices.map(n => ({
        type: 'notice',
        message: `Notice "${n.title}" was published`,
        time: n.createdAt,
      })),
    ];


    activities.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.json({
      stats: {
        totalStudents,
        totalTeachers,
        totalClasses,
        totalSubjects,
      },
      recentActivities: activities.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
