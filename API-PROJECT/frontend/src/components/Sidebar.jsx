import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Add Song", path: "/admin/add" },
    { name: "Manage Songs", path: "/admin/manage" },
  ];

  return (
    <aside className="w-64 bg-gray-900/60 backdrop-blur-md border-r border-gray-800/80 min-h-[calc(100vh-73px)] p-6 flex flex-col justify-between">
      <div className="space-y-8">
        <div>
          <h2 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4 px-3">
            Admin Panel
          </h2>
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-purple-600 text-white shadow-[0_4px_15px_rgba(168,85,247,0.25)]"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 border border-transparent hover:border-red-500/10 cursor-pointer"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
