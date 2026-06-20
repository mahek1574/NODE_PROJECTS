import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/75 backdrop-blur-md border-b border-gray-800/80 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
      
        <Link to="/" className="flex items-center space-x-2 text-white font-extrabold text-2xl tracking-wider hover:opacity-95 transition-opacity">
          <span className="text-purple-500 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">MH</span>
          <span>MusicHub</span>
        </Link>

      
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              isActive("/") ? "text-purple-400" : "text-gray-300 hover:text-white"
            }`}
          >
            Home
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className={`text-sm font-medium transition-colors ${
                  isActive("/login") ? "text-purple-400" : "text-gray-300 hover:text-white"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-4.5 py-2 rounded-xl transition-all duration-200 shadow-[0_4px_12px_rgba(168,85,247,0.25)] hover:shadow-[0_4px_20px_rgba(168,85,247,0.4)]"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className={`text-sm font-medium transition-colors ${
                  isActive("/profile") ? "text-purple-400" : "text-gray-300 hover:text-white"
                }`}
              >
                Profile
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className={`text-sm font-semibold transition-all duration-200 border border-purple-500/30 hover:border-purple-500/70 bg-purple-500/5 hover:bg-purple-500/10 px-3.5 py-1.5 rounded-lg ${
                    location.pathname.startsWith("/admin") ? "text-purple-400 border-purple-500/60" : "text-purple-300"
                  }`}
                >
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
