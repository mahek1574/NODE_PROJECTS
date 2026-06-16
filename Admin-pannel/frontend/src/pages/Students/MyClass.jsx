import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { School, User, Mail, Users } from 'lucide-react';

const MyClass = () => {
  const [classInfo, setClassInfo] = useState(null);
  const [classmates, setClassmates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClassDetails();
  }, []);

  const fetchClassDetails = async () => {
    try {
      const { data } = await axios.get('/api/students/dashboard-details');
      setClassInfo(data.classInfo);
      setClassmates(data.classInfo?.students || []);
    } catch (error) {
      console.error('Error fetching student class details', error);
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
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Classroom & Profile</h1>
        <p className="text-xs text-gray-400 mt-1">Review your classroom details, class advisor, and fellow classmates.</p>
      </div>

      {classInfo ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Class Advisor Info Card */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-brand-primary">
                <School size={22} />
                <span className="font-bold text-sm">Classroom Parameters</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{classInfo.className}</h2>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Advisor Teacher</p>
                {classInfo.assignedTeacher ? (
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary font-bold text-sm shrink-0">
                      {classInfo.assignedTeacher.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{classInfo.assignedTeacher.name}</p>
                      <span className="flex items-center text-[10px] text-gray-400 mt-0.5 space-x-1">
                        <Mail size={10} />
                        <span className="truncate">{classInfo.assignedTeacher.email}</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-450 italic">No Class Advisor assigned yet.</p>
                )}
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium">
            <h3 className="text-sm font-bold text-gray-855 dark:text-gray-250 mb-6 flex items-center space-x-2">
              <Users size={16} className="text-brand-primary animate-pulse" />
              <span>Classmates List ({classmates.length})</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50 dark:bg-gray-900/50">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-xs text-gray-700 dark:text-gray-300">
                  {classmates.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                      <td className="px-4 py-3.5 font-medium text-gray-800 dark:text-gray-200">{student.name}</td>
                      <td className="px-4 py-3.5 text-gray-500 dark:text-gray-400">{student.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-150 dark:border-gray-800 text-center text-xs text-gray-400">
          You are not currently enrolled in any class groups. Please contact Admin.
        </div>
      )}
    </div>
  );
};

export default MyClass;
