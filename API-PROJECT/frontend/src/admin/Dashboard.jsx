import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/songs");
        if (response.data.success) {
          setSongs(response.data.songs);
        } else {
          setError("Failed to fetch dashboard data");
        }
      } catch (err) {
        setError("Failed to connect to backend");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalSongs = songs.length;
  const recentSongs = songs.slice(0, 5);

  return (
    <div className="flex-1 flex bg-gray-950">
      <Sidebar />
      <div className="flex-1 p-8 sm:p-10 max-w-6xl">
        <h1 className="text-3xl font-extrabold text-white mb-8 tracking-wide flex items-center">
          <span className="w-2.5 h-6 bg-purple-500 rounded-full mr-3"></span>
          Dashboard Overview
        </h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl">
            {error}
          </div>
        ) : (
          <div className="space-y-10">
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
              <div className="relative overflow-hidden bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"></div>
                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">
                  Total Songs
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white">{totalSongs}</span>
                  <span className="text-purple-400 text-sm font-medium">tracks loaded</span>
                </div>
              </div>

          
              <div className="relative overflow-hidden bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">
                  System Status
                </h3>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 bg-emerald-500 rounded-full animate-ping"></span>
                  <span className="text-2xl font-bold text-white">Active</span>
                </div>
                <p className="text-gray-500 text-xs mt-2">Connected to Database</p>
              </div>
            </div>

    
            <div className="bg-gray-900/40 border border-gray-800/85 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recently Added Songs</h2>
              {recentSongs.length === 0 ? (
                <p className="text-gray-400 text-sm">No songs added yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                        <th className="pb-3 pl-4">Cover</th>
                        <th className="pb-3">Title</th>
                        <th className="pb-3">Artist</th>
                        <th className="pb-3 pr-4">Album</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                      {recentSongs.map((song) => (
                        <tr key={song._id} className="text-sm hover:bg-gray-800/20 transition-colors">
                          <td className="py-3 pl-4">
                            <img
                              src={song.coverImage || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100"}
                              alt={song.title}
                              className="w-10 h-10 object-cover rounded-lg border border-gray-800"
                            />
                          </td>
                          <td className="py-3 text-white font-semibold">{song.title}</td>
                          <td className="py-3 text-gray-300">{song.artist}</td>
                          <td className="py-3 text-gray-450 pr-4">{song.album || "Single"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
