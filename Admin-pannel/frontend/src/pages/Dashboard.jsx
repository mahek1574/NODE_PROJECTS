import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  School,
  BookOpen,
  Plus,
  Bell,
  ArrowRight,
  TrendingUp,
  Clock,
  Briefcase
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [notices, setNotices] = useState([]);
  
  const [extraDetails, setExtraDetails] = useState(null);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (user.role === 'admin') {
          const statsRes = await axios.get('/api/dashboard/stats');
          setStats(statsRes.data.stats);
          setActivities(statsRes.data.recentActivities);
          
          const noticesRes = await axios.get('/api/notices');
          setNotices(noticesRes.data.slice(0, 3));
        } else if (user.role === 'teacher') {
          const res = await axios.get('/api/teachers/dashboard-details');
          setExtraDetails(res.data);
          
          const noticesRes = await axios.get('/api/notices');
          setNotices(noticesRes.data.slice(0, 4));
        } else if (user.role === 'student') {
          const res = await axios.get('/api/students/dashboard-details');
          setExtraDetails(res.data);
          
          const noticesRes = await axios.get('/api/notices');
          setNotices(noticesRes.data.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching dashboard details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }



  if (user.role === 'admin') {
    const growthData = [
      { name: 'Jan', Students: 40 },
      { name: 'Feb', Students: 60 },
      { name: 'Mar', Students: 95 },
      { name: 'Apr', Students: 120 },
      { name: 'May', Students: 155 },
      { name: 'Jun', Students: 180 },
    ];

    const distributionData = [
      { name: 'Primary', value: 400 },
      { name: 'Secondary', value: 300 },
      { name: 'Higher Secondary', value: 200 },
    ];

    const COLORS = ['#4F46E5', '#06B6D4', '#8B5CF6'];

    return (
      <div className="space-y-8">
      
        <div>
          <h1 className="text-2xl font-bold text-gray-850 dark:text-gray-100">Workspace Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Hello, {user.name}. Here is what's happening at CampusCore today.</p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Students</p>
              <h3 className="text-3xl font-bold text-gray-850 dark:text-gray-100 mt-2">{stats?.totalStudents || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Users size={22} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Teachers</p>
              <h3 className="text-3xl font-bold text-gray-850 dark:text-gray-100 mt-2">{stats?.totalTeachers || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
              <GraduationCap size={22} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Classes</p>
              <h3 className="text-3xl font-bold text-gray-850 dark:text-gray-100 mt-2">{stats?.totalClasses || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
              <School size={22} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Subjects</p>
              <h3 className="text-3xl font-bold text-gray-850 dark:text-gray-100 mt-2">{stats?.totalSubjects || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success">
              <BookOpen size={22} />
            </div>
          </div>
        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-gray-850 dark:text-gray-200">Student Enrollment Growth</h3>
              <span className="flex items-center text-xs text-success font-medium">
                <TrendingUp size={14} className="mr-1" /> +15.4%
              </span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-gray-800" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="Students" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorStudents)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium">
            <h3 className="text-sm font-semibold text-gray-850 dark:text-gray-200 mb-6">Class Level Distribution</h3>
            <div className="h-64 flex flex-col justify-between items-center">
              <div className="w-full h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-4 w-full">
                {distributionData.map((item, idx) => (
                  <div key={item.name} className="text-center">
                    <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ backgroundColor: COLORS[idx] }}></span>
                    <span className="text-[11px] text-gray-400 block mt-1">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-850 dark:text-gray-200 mb-4">Quick Shortcuts</h3>
              <p className="text-xs text-gray-400 mb-6">Frequently used management tools</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/students"
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-brand-primary/40 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-brand-primary/5 transition-all text-center group"
              >
                <Users size={20} className="text-brand-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Add Student</span>
              </Link>
              <Link
                to="/teachers"
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-brand-secondary/40 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-brand-secondary/5 transition-all text-center group"
              >
                <GraduationCap size={20} className="text-brand-secondary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Add Teacher</span>
              </Link>
              <Link
                to="/classes"
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-brand-accent/40 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-brand-accent/5 transition-all text-center group"
              >
                <School size={20} className="text-brand-accent mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Create Class</span>
              </Link>
              <Link
                to="/subjects"
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-success/40 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-success/5 transition-all text-center group"
              >
                <BookOpen size={20} className="text-success mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Create Subject</span>
              </Link>
            </div>
          </div>

      
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium">
            <h3 className="text-sm font-semibold text-gray-850 dark:text-gray-200 mb-6">Recent Activities</h3>
            <div className="space-y-4">
              {activities.length > 0 ? (
                activities.map((act, index) => (
                  <div key={index} className="flex items-start space-x-3 text-xs">
                    <div className="w-7 h-7 rounded-full bg-gray-50 dark:bg-gray-850 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 mt-0.5">
                      <Clock size={12} />
                    </div>
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">{act.message}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{new Date(act.time).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 py-4 text-center">No recent activities available.</p>
              )}
            </div>
          </div>

        
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-gray-850 dark:text-gray-200">Latest Notices</h3>
                <Link to="/notices" className="text-xs text-brand-primary flex items-center hover:underline">
                  View all <ArrowRight size={12} className="ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {notices.length > 0 ? (
                  notices.map((n) => (
                    <div key={n._id} className="p-3 bg-gray-50 dark:bg-gray-850/40 rounded-xl border border-gray-100 dark:border-gray-800/40">
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{n.title}</p>
                      <p className="text-[10px] text-gray-400 truncate mt-1">{n.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 py-4 text-center">No active notices.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  if (user.role === 'teacher') {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-850 dark:text-gray-100">Welcome Back, Coach</h1>
          <p className="text-sm text-gray-400 mt-1">Hello, {user.name}. Track your assigned cohorts and read updates here.</p>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Assigned Classes</p>
              <h3 className="text-3xl font-bold text-gray-850 dark:text-gray-100 mt-2">{extraDetails?.classes?.length || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <School size={22} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Assigned Subjects</p>
              <h3 className="text-3xl font-bold text-gray-850 dark:text-gray-100 mt-2">{extraDetails?.subjects?.length || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
              <BookOpen size={22} />
            </div>
          </div>
        </div>

    
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium">
            <h3 className="text-sm font-semibold text-gray-850 dark:text-gray-200 mb-6">My Class Cohorts</h3>
            {extraDetails?.classes && extraDetails.classes.length > 0 ? (
              <div className="space-y-4">
                {extraDetails.classes.map((cls) => (
                  <div key={cls._id} className="p-4 bg-gray-50 dark:bg-gray-850/40 border border-gray-100 dark:border-gray-800/40 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-850 dark:text-gray-200">{cls.className}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{cls.students.length} Students enrolled</p>
                    </div>
                    <Link
                      to="/assigned-classes"
                      className="p-2 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary text-xs font-semibold rounded-lg hover:text-white transition-colors"
                    >
                      View Students
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 py-6 text-center">You have no assigned classes.</p>
            )}
          </div>

      
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium">
            <h3 className="text-sm font-semibold text-gray-850 dark:text-gray-200 mb-6">Notice Board</h3>
            <div className="space-y-4">
              {notices.length > 0 ? (
                notices.map((n) => (
                  <div key={n._id} className="p-3 bg-gray-50 dark:bg-gray-850/40 border border-gray-100 dark:border-gray-800/40 rounded-xl">
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{n.title}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{n.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 py-4 text-center">No active notices.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user.role === 'student') {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-850 dark:text-gray-100">Welcome Back, {user.name}</h1>
          <p className="text-sm text-gray-400 mt-1">Here is a quick look at your academic schedule and notices.</p>
        </div>

  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium">
            <h3 className="text-sm font-semibold text-gray-850 dark:text-gray-200 mb-6">My Class Information</h3>
            {extraDetails?.classInfo ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 bg-brand-primary/5 border border-brand-primary/10 rounded-xl">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Class Name</p>
                  <p className="text-lg font-bold text-brand-primary mt-1">{extraDetails.classInfo.className}</p>
                </div>
                <div className="p-4 bg-brand-secondary/5 border border-brand-secondary/10 rounded-xl">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Class Advisor</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-1">
                    {extraDetails.classInfo.assignedTeacher?.name || 'Not Assigned'}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400 py-6 text-center">You are not assigned to any class yet.</p>
            )}

            <h3 className="text-sm font-semibold text-gray-850 dark:text-gray-200 mt-8 mb-4">My Subjects</h3>
            {extraDetails?.subjects && extraDetails.subjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {extraDetails.subjects.map((sub) => (
                  <div key={sub._id} className="p-4 bg-gray-50 dark:bg-gray-850/40 border border-gray-100 dark:border-gray-800/40 rounded-xl">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{sub.subjectName}</p>
                    <p className="text-[10px] text-gray-400 mt-1">Instructor: {sub.assignedTeacher?.name || 'TBA'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 py-4 text-center">No subjects found.</p>
            )}
          </div>

    
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium">
            <h3 className="text-sm font-semibold text-gray-850 dark:text-gray-200 mb-6">Announcements</h3>
            <div className="space-y-4">
              {notices.length > 0 ? (
                notices.map((n) => (
                  <div key={n._id} className="p-3 bg-gray-50 dark:bg-gray-850/40 border border-gray-100 dark:border-gray-800/40 rounded-xl">
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{n.title}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{n.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 py-4 text-center">No announcements published.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Dashboard;
