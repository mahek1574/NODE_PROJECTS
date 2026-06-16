import User from '../models/User.js';
import Class from '../models/Class.js';
import Subject from '../models/Subject.js';

export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createStudent = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const studentExists = await User.findOne({ email });

    if (studentExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const student = await User.create({
      name,
      email,
      password,
      role: 'student',
    });

    res.status(201).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      role: student.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (student && student.role === 'student') {
      student.name = req.body.name || student.name;
      student.email = req.body.email || student.email;
      if (req.body.password) {
        student.password = req.body.password;
      }

      const updatedStudent = await student.save();
      res.json({
        _id: updatedStudent._id,
        name: updatedStudent.name,
        email: updatedStudent.email,
        role: updatedStudent.role,
      });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (student && student.role === 'student') {
    
      await Class.updateMany(
        { students: student._id },
        { $pull: { students: student._id } }
      );

      await User.findByIdAndDelete(student._id);
      res.json({ message: 'Student removed successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getStudentDashboardDetails = async (req, res) => {
  try {
    const studentId = req.user._id;
    const studentClass = await Class.findOne({ students: studentId })
      .populate('assignedTeacher', 'name email')
      .populate('students', 'name email');

    let subjects = [];
    if (studentClass) {
  
      subjects = await Subject.find({ assignedClass: studentClass._id })
        .populate('assignedTeacher', 'name email');
    }

    res.json({
      studentInfo: req.user,
      classInfo: studentClass ? {
        _id: studentClass._id,
        className: studentClass.className,
        assignedTeacher: studentClass.assignedTeacher,
        studentCount: studentClass.students.length,
      } : null,
      subjects: subjects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
