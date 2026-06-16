import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Edit2, Trash2, X, Loader2, Users } from 'lucide-react';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [className, setClassName] = useState('');
  const [assignedTeacher, setAssignedTeacher] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [modalError, setModalError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [classRes, teacherRes, studentRes] = await Promise.all([
        axios.get('/api/classes'),
        axios.get('/api/teachers'),
        axios.get('/api/students'),
      ]);
      setClasses(classRes.data);
      setTeachers(teacherRes.data);
      setStudents(studentRes.data);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingClass(null);
    setClassName('');
    setAssignedTeacher('');
    setSelectedStudents([]);
    setModalError('');
    setModalOpen(true);
  };

  const openEditModal = (cls) => {
    setEditingClass(cls);
    setClassName(cls.className);
    setAssignedTeacher(cls.assignedTeacher?._id || '');
    setSelectedStudents(cls.students.map(s => s._id) || []);
    setModalError('');
    setModalOpen(true);
  };

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError('');
    setSubmitting(true);

    try {
      const payload = {
        className,
        assignedTeacher: assignedTeacher || null,
        students: selectedStudents,
      };

      if (editingClass) {
        await axios.put(`/api/classes/${editingClass._id}`, payload);
      } else {
        await axios.post('/api/classes', payload);
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
    if (window.confirm('Are you sure you want to remove this class? All associated subjects will also be deleted.')) {
      try {
        await axios.delete(`/api/classes/${id}`);
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete class.');
      }
    }
  };

  const filteredClasses = classes.filter(cls =>
    cls.className.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
    
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Classes Directory</h1>
          <p className="text-xs text-gray-400 mt-1">Manage classrooms, student cohorts, and class advisors.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-xl text-xs font-semibold shadow-md shadow-brand-primary/10 transition-all self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Create Class</span>
        </button>
      </div>


      <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-155 dark:border-gray-800 rounded-xl px-4 py-2 max-w-md shadow-sm">
        <Search size={16} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search class by name..."
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
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Class Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Advisor / Teacher</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Enrolled Students</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((cls) => (
                    <tr key={cls._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent font-bold text-xs">
                            {cls.className.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{cls.className}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                        {cls.assignedTeacher ? (
                          <span className="font-medium text-gray-700 dark:text-gray-300">{cls.assignedTeacher.name}</span>
                        ) : (
                          <span className="text-gray-400 italic">None Assigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1.5">
                          <Users size={14} className="text-gray-400" />
                          <span>{cls.students?.length || 0} Students</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(cls)}
                            className="p-1.5 text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary hover:bg-gray-100 dark:hover:bg-gray-850 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(cls._id)}
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
                      No class records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {editingClass ? 'Edit Class Parameters' : 'Create Class Room'}
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
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Class Name</label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="e.g. Grade 10 - Science"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs outline-none focus:border-brand-primary transition-colors text-gray-850 dark:text-gray-100"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Assigned Advisor (Teacher)</label>
                <select
                  value={assignedTeacher}
                  onChange={(e) => setAssignedTeacher(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs outline-none focus:border-brand-primary transition-colors text-gray-850 dark:text-gray-100 dark:bg-gray-900"
                >
                  <option value="">-- Assign Advisor --</option>
                  {teachers.map(t => (
                    <option key={t._id} value={t._id}>{t.name}</option>
                  ))}
                </select>
              </div>

              
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Enroll Students</label>
                <div className="border border-gray-200 dark:border-gray-800 rounded-xl max-h-40 overflow-y-auto p-3 space-y-2">
                  {students.length > 0 ? (
                    students.map(s => (
                      <label key={s._id} className="flex items-center space-x-3 text-xs text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/40 p-1 rounded transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(s._id)}
                          onChange={() => handleCheckboxChange(s._id)}
                          className="rounded text-brand-primary border-gray-305 focus:ring-brand-primary"
                        />
                        <span>{s.name} ({s.email})</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-[11px] text-gray-450 text-center py-4">No students registered in systems.</p>
                  )}
                </div>
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
                  <span>{editingClass ? 'Save Changes' : 'Create Class'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList;
