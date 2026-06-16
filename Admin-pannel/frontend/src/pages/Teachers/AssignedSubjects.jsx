import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, MapPin } from 'lucide-react';

const AssignedSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignedSubjects();
  }, []);

  const fetchAssignedSubjects = async () => {
    try {
      const { data } = await axios.get('/api/teachers/dashboard-details');
      setSubjects(data.subjects || []);
    } catch (error) {
      console.error('Error fetching assigned subjects', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Assigned Subjects</h1>
        <p className="text-xs text-gray-400 mt-1">Course modules that you teach.</p>
      </div>

      {subjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub) => (
            <div
              key={sub._id}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium flex items-start space-x-4"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <BookOpen size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">{sub.subjectName}</h3>
                <div className="flex items-center space-x-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <MapPin size={12} className="text-gray-400" />
                  <span>Classroom: {sub.assignedClass?.className}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-150 dark:border-gray-800 text-center text-xs text-gray-400">
          You are not currently assigned to instruct any subjects.
        </div>
      )}
    </div>
  );
};

export default AssignedSubjects;
