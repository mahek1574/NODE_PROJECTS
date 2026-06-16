import Class from '../models/Class.js';
import Subject from '../models/Subject.js';


export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('assignedTeacher', 'name email')
      .populate('students', 'name email');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createClass = async (req, res) => {
  const { className, assignedTeacher, students } = req.body;

  try {
    const classExists = await Class.findOne({ className });

    if (classExists) {
      return res.status(400).json({ message: 'Class name already exists' });
    }

    const newClass = await Class.create({
      className,
      assignedTeacher: assignedTeacher || null,
      students: students || [],
    });

    const populatedClass = await Class.findById(newClass._id)
      .populate('assignedTeacher', 'name email')
      .populate('students', 'name email');

    res.status(201).json(populatedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  const { className, assignedTeacher, students } = req.body;

  try {
    const existingClass = await Class.findById(req.params.id);

    if (existingClass) {
      existingClass.className = className || existingClass.className;
      existingClass.assignedTeacher = assignedTeacher !== undefined ? assignedTeacher : existingClass.assignedTeacher;
      existingClass.students = students !== undefined ? students : existingClass.students;

      const updatedClass = await existingClass.save();
      const populatedClass = await Class.findById(updatedClass._id)
        .populate('assignedTeacher', 'name email')
        .populate('students', 'name email');

      res.json(populatedClass);
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const classToDelete = await Class.findById(req.params.id);

    if (classToDelete) {
      await Subject.deleteMany({ assignedClass: classToDelete._id });

      await Class.findByIdAndDelete(classToDelete._id);
      res.json({ message: 'Class removed successfully' });
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
