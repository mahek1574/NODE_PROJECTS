import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },
  assignedTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  assignedClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
}, {
  timestamps: true,
});

subjectSchema.index({ subjectName: 1, assignedClass: 1 }, { unique: true });

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
