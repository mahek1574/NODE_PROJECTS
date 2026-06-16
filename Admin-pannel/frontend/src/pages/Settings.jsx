import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Shield, Sun, Moon } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Settings Console</h1>
        <p className="text-xs text-gray-400 mt-1">Manage profile information and system preferences.</p>
      </div>

  
      <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl shadow-premium overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center space-x-2">
          <User size={16} className="text-brand-primary" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Profile Credentials</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-gray-450 uppercase font-semibold">Full Name</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">{user?.name}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-455 uppercase font-semibold">Email Address</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">{user?.email}</p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary capitalize">
              System Role: {user?.role}
            </span>
          </div>
        </div>
      </div>

  
      <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl shadow-premium overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center space-x-2">
          <Shield size={16} className="text-brand-accent" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Layout Preferences</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Dark Mode Mode</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Toggle dark and light color themes.</p>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850 text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors"
            >
              {theme === 'light' ? (
                <>
                  <Moon size={14} />
                  <span>Activate Dark</span>
                </>
              ) : (
                <>
                  <Sun size={14} />
                  <span>Activate Light</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
