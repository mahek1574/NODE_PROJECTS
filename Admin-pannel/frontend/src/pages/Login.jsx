import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2, School } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setError('Please enter both email and password.');
    }

    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };


  const fillCredentials = (role) => {
    if (role === 'admin') {
      setEmail('admin@campuscore.com');
      setPassword('admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 transition-colors duration-200">
      <div className="w-full max-w-md">
      
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-xl shadow-brand-primary/20 mb-3">
            <School size={24} />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent">
            CampusCore
          </h1>
          <p className="text-xs text-gray-400 mt-1">School Management Admin Panel</p>
        </div>


        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl shadow-premium p-8">
          <h2 className="text-xl font-semibold text-gray-850 dark:text-gray-100 mb-6">Welcome Back</h2>

          {error && (
            <div className="mb-4 p-3 bg-danger/10 border border-danger/20 text-danger rounded-lg text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@school.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm outline-none focus:border-brand-primary transition-colors text-gray-800 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm outline-none focus:border-brand-primary transition-colors text-gray-800 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-brand-primary hover:bg-brand-primary/95 text-white font-medium text-sm rounded-xl transition-all shadow-md shadow-brand-primary/10 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>


          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-3">Quick Login Shortcut</p>
            <button
              onClick={() => fillCredentials('admin')}
              className="w-full py-2 bg-gray-50 dark:bg-gray-850 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-850 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 transition-colors"
            >
              Autofill Default Admin
            </button>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              (Admin will be auto-created in your local database upon first server start)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
