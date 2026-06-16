import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { School, Users } from 'lucide-react';

const AssignedClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    fetchAssignedClasses();
  }, []);

  const fetchAssignedClasses = async () => {
    try {
      const { data } = await axios.get('/api/teachers/dashboard-details');
      setClasses(data.classes || []);
      if (data.classes?.length > 0) {
        setSelectedClass(data.classes[0]);
      }
    } catch (error) {
      console.error('Error fetching assigned classes', error);
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
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Assigned Cohorts</h1>
        <p className="text-xs text-gray-400 mt-1">Select class groups below to view enrolled student directory details.</p>
      </div>

      {classes.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
          <div className="space-y-2">
            {classes.map((c) => (
              <button
                key={c._id}
                onClick={() => setSelectedClass(c)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                  selectedClass?._id === c._id
                    ? 'bg-brand-primary/10 border-brand-primary/30 text-brand-primary font-semibold'
                    : 'bg-white dark:bg-gray-900 border-gray-150 dark:border-gray-800 text-gray-750 dark:text-gray-450 hover:bg-gray-50/50 dark:hover:bg-gray-850'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <School size={16} />
                  <span className="text-xs">{c.className}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-450">
                  {c.students?.length}
                </span>
              </button>
            ))}
          </div>

          
          <div className="lg:col-span-3 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium">
            <h3 className="text-sm font-bold text-gray-855 dark:text-gray-250 mb-6 flex items-center space-x-2">
              <Users size={16} className="text-brand-primary" />
              <span>Students Enrolled in {selectedClass?.className}</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50 dark:bg-gray-900/50">
                    <th className="px-4 py-3">Student Name</th>
                    <th className="px-4 py-3">Email Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-xs text-gray-700 dark:text-gray-300">
                  {selectedClass?.students?.length > 0 ? (
                    selectedClass.students.map((student) => (
                      <tr key={student._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                        <td className="px-4 py-3.5 font-medium text-gray-800 dark:text-gray-200">{student.name}</td>
                        <td className="px-4 py-3.5 text-gray-500 dark:text-gray-400">{student.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-4 py-6 text-center text-gray-400 italic">
                        No students enrolled in this class.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-150 dark:border-gray-800 text-center text-xs text-gray-405">
          You are not currently assigned as advisor to any classes.
        </div>
      )}
    </div>
  );
};

export default AssignedClasses;
