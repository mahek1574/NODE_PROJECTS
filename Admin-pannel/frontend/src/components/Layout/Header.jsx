import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Menu, Sun, Moon, Bell, Search, ChevronDown, LogOut, User } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef();
  const notifRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6">
    
      <div className="flex items-center space-x-4 flex-1">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Menu size={22} />
        </button>

        <div className="hidden sm:flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 rounded-lg px-3 py-1.5 w-64 max-w-sm focus-within:border-brand-primary/50 transition-colors">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search records..."
            className="bg-transparent border-none outline-none text-xs w-full text-gray-700 dark:text-gray-300 placeholder-gray-400"
          />
        </div>
      </div>

  
      <div className="flex items-center space-x-4">
      
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
          title="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

      
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors relative"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-secondary rounded-full"></span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden py-1">
              <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 font-semibold text-xs text-gray-700 dark:text-gray-300">
                System Notifications
              </div>
              <div className="max-h-60 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800/60 last:border-none">
                  <p className="text-xs font-medium text-gray-800 dark:text-gray-200">Welcome to CampusCore!</p>
                  <p className="text-[10px] text-gray-400 mt-1">10 mins ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800/60 last:border-none">
                  <p className="text-xs font-medium text-gray-800 dark:text-gray-200">New notice published by admin.</p>
                  <p className="text-[10px] text-gray-400 mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

    
        <span className="h-6 w-px bg-gray-200 dark:bg-gray-800"></span>

  
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white"
          >
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-semibold text-sm border border-brand-primary/20">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:inline text-xs font-medium">{user?.name}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl py-1 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-400">Signed in as</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{user?.name}</p>
                <p className="text-[10px] text-gray-400 truncate mt-0.5">{user?.email}</p>
              </div>

              <div className="py-1">
                <div className="px-4 py-2 flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300">
                  <User size={14} className="text-gray-400" />
                  <span className="capitalize font-medium">Role: {user?.role}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 py-1">
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-xs text-danger hover:bg-danger/5 text-left transition-colors"
                >
                  <LogOut size={14} />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
