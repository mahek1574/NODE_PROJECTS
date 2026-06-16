import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Edit2, Trash2, X, Loader2 } from 'lucide-react';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [subjectName, setSubjectName] = useState('');
  const [assignedTeacher, setAssignedTeacher] = useState('');
  const [assignedClass, setAssignedClass] = useState('');
  const [modalError, setModalError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subjectRes, classRes, teacherRes] = await Promise.all([
        axios.get('/api/subjects'),
        axios.get('/api/classes'),
        axios.get('/api/teachers'),
      ]);
      setSubjects(subjectRes.data);
      setClasses(classRes.data);
      setTeachers(teacherRes.data);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingSubject(null);
    setSubjectName('');
    setAssignedTeacher('');
    setAssignedClass('');
    setModalError('');
    setModalOpen(true);
  };

  const openEditModal = (subject) => {
    setEditingSubject(subject);
    setSubjectName(subject.subjectName);
    setAssignedTeacher(subject.assignedTeacher?._id || '');
    setAssignedClass(subject.assignedClass?._id || '');
    setModalError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError('');
    setSubmitting(true);

    if (!assignedClass) {
      setModalError('Please assign this subject to a class.');
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        subjectName,
        assignedTeacher: assignedTeacher || null,
        assignedClass,
      };

      if (editingSubject) {
        await axios.put(`/api/subjects/${editingSubject._id}`, payload);
      } else {
        await axios.post('/api/subjects', payload);
      }

      setModalOpen(false);
      fetchData();
    } catch (error) {
      setModalError(error.response?.data?.message || 'Action failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this subject?')) {
      try {
        await axios.delete(`/api/subjects/${id}`);
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete subject.');
      }
    }
  };

  const filteredSubjects = subjects.filter(sub =>
    sub.subjectName.toLowerCase().includes(search.toLowerCase()) ||
    sub.assignedClass?.className.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Subjects Registry</h1>
          <p className="text-xs text-gray-400 mt-1">Manage curricular subjects and instructors assigned to classrooms.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-xl text-xs font-semibold shadow-md shadow-brand-primary/10 transition-all self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Create Subject</span>
        </button>
      </div>

    
      <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-155 dark:border-gray-800 rounded-xl px-4 py-2 max-w-md shadow-sm">
        <Search size={16} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search by subject name or class..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-xs w-full text-gray-700 dark:text-gray-300 placeholder-gray-400"
        />
      </div>

  
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Assigned Class</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Teacher / Instructor</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                {filteredSubjects.length > 0 ? (
                  filteredSubjects.map((sub) => (
                    <tr key={sub._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success font-bold text-xs">
                            {sub.subjectName.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{sub.subjectName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                        {sub.assignedClass?.className}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                        {sub.assignedTeacher ? (
                          <span className="font-medium text-gray-700 dark:text-gray-300">{sub.assignedTeacher.name}</span>
                        ) : (
                          <span className="text-gray-400 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(sub)}
                            className="p-1.5 text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary hover:bg-gray-100 dark:hover:bg-gray-850 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(sub._id)}
                            className="p-1.5 text-gray-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-xs text-gray-400">
                      No subject records found matching search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-955/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {editingSubject ? 'Edit Subject Settings' : 'Create New Subject'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {modalError && (
                <div className="p-3 bg-danger/10 border border-danger/20 text-danger rounded-lg text-xs font-medium">
                  {modalError}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Subject Name</label>
                <input
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="e.g. Physics I"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs outline-none focus:border-brand-primary transition-colors text-gray-850 dark:text-gray-100"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Assigned Class</label>
                <select
                  value={assignedClass}
                  onChange={(e) => setAssignedClass(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs outline-none focus:border-brand-primary transition-colors text-gray-850 dark:text-gray-100 dark:bg-gray-900"
                  required
                >
                  <option value="">-- Choose Class --</option>
                  {classes.map(c => (
                    <option key={c._id} value={c._id}>{c.className}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Instructor (Teacher)</label>
                <select
                  value={assignedTeacher}
                  onChange={(e) => setAssignedTeacher(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs outline-none focus:border-brand-primary transition-colors text-gray-850 dark:text-gray-100 dark:bg-gray-900"
                >
                  <option value="">-- Choose Teacher --</option>
                  {teachers.map(t => (
                    <option key={t._id} value={t._id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850 rounded-xl text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center space-x-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-xl text-xs font-semibold shadow-md shadow-brand-primary/10 transition-colors"
                >
                  {submitting && <Loader2 size={12} className="animate-spin" />}
                  <span>{editingSubject ? 'Save Changes' : 'Create Subject'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectList;
