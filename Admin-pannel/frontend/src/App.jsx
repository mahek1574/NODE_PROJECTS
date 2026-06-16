import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/Layout/DashboardLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/Students/StudentList';
import TeacherList from './pages/Teachers/TeacherList';
import ClassList from './pages/Classes/ClassList';
import SubjectList from './pages/Subjects/SubjectList';
import NoticeList from './pages/Notices/NoticeList';
import Settings from './pages/Settings';


import AssignedClasses from './pages/Teachers/AssignedClasses';
import AssignedSubjects from './pages/Teachers/AssignedSubjects';

// Student Specific Pages
import MyClass from './pages/Students/MyClass';
import MySubjects from './pages/Students/MySubjects';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
        
            <Route path="/login" element={<Login />} />

          
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Routes>
                
                      <Route path="/" element={<Dashboard />} />
                      
                  
                      <Route path="/notices" element={<NoticeList />} />
                      
                    
                      <Route path="/settings" element={<Settings />} />

            
                      <Route
                        path="/students"
                        element={
                          <ProtectedRoute allowedRoles={['admin']}>
                            <StudentList />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/teachers"
                        element={
                          <ProtectedRoute allowedRoles={['admin']}>
                            <TeacherList />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/classes"
                        element={
                          <ProtectedRoute allowedRoles={['admin']}>
                            <ClassList />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/subjects"
                        element={
                          <ProtectedRoute allowedRoles={['admin']}>
                            <SubjectList />
                          </ProtectedRoute>
                        }
                      />

          
                      <Route
                        path="/assigned-classes"
                        element={
                          <ProtectedRoute allowedRoles={['teacher']}>
                            <AssignedClasses />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/assigned-subjects"
                        element={
                          <ProtectedRoute allowedRoles={['teacher']}>
                            <AssignedSubjects />
                          </ProtectedRoute>
                        }
                      />

                  
                      <Route
                        path="/my-class"
                        element={
                          <ProtectedRoute allowedRoles={['student']}>
                            <MyClass />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/my-subjects"
                        element={
                          <ProtectedRoute allowedRoles={['student']}>
                            <MySubjects />
                          </ProtectedRoute>
                        }
                      />

                  
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
