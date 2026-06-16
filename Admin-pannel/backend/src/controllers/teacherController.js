import User from '../models/User.js';
import Class from '../models/Class.js';
import Subject from '../models/Subject.js';

export const getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).select('-password');
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeacher = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const teacherExists = await User.findOne({ email });

    if (teacherExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const teacher = await User.create({
      name,
      email,
      password,
      role: 'teacher',
    });

    res.status(201).json({
      _id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      role: teacher.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateTeacher = async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id);

    if (teacher && teacher.role === 'teacher') {
      teacher.name = req.body.name || teacher.name;
      teacher.email = req.body.email || teacher.email;
      if (req.body.password) {
        teacher.password = req.body.password;
      }

      const updatedTeacher = await teacher.save();
      res.json({
        _id: updatedTeacher._id,
        name: updatedTeacher.name,
        email: updatedTeacher.email,
        role: updatedTeacher.role,
      });
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id);

    if (teacher && teacher.role === 'teacher') {
  
      await Class.updateMany(
        { assignedTeacher: teacher._id },
        { $set: { assignedTeacher: null } }
      );

      await Subject.updateMany(
        { assignedTeacher: teacher._id },
        { $set: { assignedTeacher: null } }
      );

      await User.findByIdAndDelete(teacher._id);
      res.json({ message: 'Teacher removed successfully' });
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTeacherDashboardDetails = async (req, res) => {
  try {
    const teacherId = req.user._id;


    const classes = await Class.find({ assignedTeacher: teacherId })
      .populate('students', 'name email');


    const subjects = await Subject.find({ assignedTeacher: teacherId })
      .populate('assignedClass', 'className');

    res.json({
      classes: classes.map(c => ({
        _id: c._id,
        className: c.className,
        students: c.students,
      })),
      subjects: subjects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
