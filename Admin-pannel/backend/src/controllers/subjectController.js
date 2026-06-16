import Subject from '../models/Subject.js';


export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate('assignedTeacher', 'name email')
      .populate('assignedClass', 'className');
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createSubject = async (req, res) => {
  const { subjectName, assignedTeacher, assignedClass } = req.body;

  try {
    const newSubject = await Subject.create({
      subjectName,
      assignedTeacher: assignedTeacher || null,
      assignedClass,
    });

    const populatedSubject = await Subject.findById(newSubject._id)
      .populate('assignedTeacher', 'name email')
      .populate('assignedClass', 'className');

    res.status(201).json(populatedSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSubject = async (req, res) => {
  const { subjectName, assignedTeacher, assignedClass } = req.body;

  try {
    const subject = await Subject.findById(req.params.id);

    if (subject) {
      subject.subjectName = subjectName || subject.subjectName;
      subject.assignedTeacher = assignedTeacher !== undefined ? assignedTeacher : subject.assignedTeacher;
      subject.assignedClass = assignedClass || subject.assignedClass;

      const updatedSubject = await subject.save();
      const populatedSubject = await Subject.findById(updatedSubject._id)
        .populate('assignedTeacher', 'name email')
        .populate('assignedClass', 'className');

      res.json(populatedSubject);
    } else {
      res.status(404).json({ message: 'Subject not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (subject) {
      await Subject.findByIdAndDelete(subject._id);
      res.json({ message: 'Subject removed successfully' });
    } else {
      res.status(404).json({ message: 'Subject not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
