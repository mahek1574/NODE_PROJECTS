import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="flex-1 bg-gray-950 flex items-center justify-center py-16 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-xl bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
        <h2 className="text-2xl font-extrabold text-white mb-8 tracking-wide flex items-center">
          <span className="w-2.5 h-6 bg-purple-500 rounded-full mr-3"></span>
          My Profile
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <img
              src={
                user?.avatar ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQIQxVp72MqMpnHIo3pDDcVYallrA7816zI_oJ9LvZWw&s"
              }
              alt={user?.username}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-purple-500/30 bg-gray-800"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80";
              }}
            />
          </div>

        
          <div className="flex-1 space-y-4 w-full text-center sm:text-left">
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block">
                Username
              </span>
              <span className="text-white text-xl font-bold">
                {user?.username}
              </span>
            </div>

            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block">
                Email Address
              </span>
              <span className="text-gray-300 text-base">{user?.email}</span>
            </div>

            <div className="pt-2">
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mb-1">
                Account Role
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  user?.role === "admin"
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                    : "bg-gray-800 text-gray-300 border border-gray-700"
                }`}
              >
                {user?.role || "user"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
