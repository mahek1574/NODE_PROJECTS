import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  School,
  Bell,
  Settings,
  LogOut,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();

  const getNavigation = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { name: 'Dashboard', path: '/', icon: LayoutDashboard },
          { name: 'Students', path: '/students', icon: Users },
          { name: 'Teachers', path: '/teachers', icon: GraduationCap },
          { name: 'Classes', path: '/classes', icon: School },
          { name: 'Subjects', path: '/subjects', icon: BookOpen },
          { name: 'Notices', path: '/notices', icon: Bell },
          { name: 'Settings', path: '/settings', icon: Settings },
        ];
      case 'teacher':
        return [
          { name: 'Dashboard', path: '/', icon: LayoutDashboard },
          { name: 'Assigned Classes', path: '/assigned-classes', icon: School },
          { name: 'Assigned Subjects', path: '/assigned-subjects', icon: BookOpen },
          { name: 'Notices', path: '/notices', icon: Bell },
        ];
      case 'student':
        return [
          { name: 'Dashboard', path: '/', icon: LayoutDashboard },
          { name: 'Class & Profile', path: '/my-class', icon: School },
          { name: 'Subjects', path: '/my-subjects', icon: BookOpen },
          { name: 'Notices', path: '/notices', icon: Bell },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavigation();

  return (
    <>
  
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-transform duration-300 transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >

        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800/80">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-bold text-lg shadow-md shadow-brand-primary/20">
              C
            </div>
            <span className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent">
              CampusCore
            </span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

      
        <div className="p-4 mx-3 my-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-800/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent font-semibold text-base">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

    
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => isOpen && toggleSidebar()}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-brand-primary'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-200'
                  }`
                }
              >
                <IconComponent size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

  
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-gray-800/80">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium text-danger hover:bg-danger/10 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
