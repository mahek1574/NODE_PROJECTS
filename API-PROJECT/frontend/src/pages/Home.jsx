import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import SongCard from "../components/SongCard";
import Loader from "../components/Loader";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/songs");
      if (response.data.success) {
        setSongs(response.data.songs);
      } else {
        setError("Failed to fetch songs");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const filteredSongs = songs.filter((song) => {
    const titleMatch = song.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const artistMatch = song.artist?.toLowerCase().includes(searchQuery.toLowerCase());
    const albumMatch = song.album?.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || artistMatch || albumMatch;
  });

  const featuredSong = songs[0]; // Simple logic for featured song
  const latestSongs = filteredSongs.slice(0, 8);

  const handleScrollToMusic = () => {
    const element = document.getElementById("music-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex-1 bg-gray-950 pb-20">
    
      <section className="relative overflow-hidden py-24 px-6 border-b border-gray-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-950 to-gray-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6 inline-block">
            Welcome to MusicHub
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
            Your Ultimate Sound <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Destination</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Discover, stream, and share your favorite tracks. Explore curated playlists, top artists, and build your digital library.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleScrollToMusic}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:translate-y-[-2px] cursor-pointer"
            >
              Explore Music
            </button>
            {!isAuthenticated && (
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Link
                  to="/login"
                  className="w-full sm:w-auto text-center bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 border border-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-full sm:w-auto text-center bg-transparent hover:bg-gray-900/50 text-gray-300 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 border border-gray-800/80"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

  
      <div id="music-section" className="max-w-7xl mx-auto px-6 mt-16">
      
        <div className="relative max-w-2xl mx-auto mb-16">
          <div className="absolute inset-0 bg-purple-500/10 rounded-2xl blur-xl opacity-30"></div>
          <div className="relative bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-2 flex items-center">
            <span className="pl-4 pr-3 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search songs, artists, albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 text-white placeholder-gray-500 focus:ring-0 outline-none text-base"
            />
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-center py-10 bg-red-950/20 border border-red-900/30 rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-red-400 font-semibold">{error}</p>
            <button
              onClick={fetchSongs}
              className="mt-4 bg-red-900/40 hover:bg-red-900/60 text-white text-xs px-4 py-2 rounded-lg border border-red-500/20"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
        
            {featuredSong && !searchQuery && (
              <section className="mb-16">
                <h2 className="text-2xl font-extrabold text-white mb-6 tracking-wide flex items-center">
                  <span className="w-2.5 h-6 bg-purple-500 rounded-full mr-3"></span>
                  Featured Track
                </h2>
                <div className="relative overflow-hidden bg-gradient-to-r from-purple-950/40 to-gray-900/40 border border-gray-800/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          
                  <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

                  <img
                    src={featuredSong.coverImage || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60"}
                    alt={featuredSong.title}
                    className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-gray-800"
                  />

                  <div className="flex-1 text-center md:text-left">
                    <span className="text-xs font-bold text-purple-400 tracking-wider uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                      Editor's Choice
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-2">
                      {featuredSong.title}
                    </h3>
                    <p className="text-gray-300 text-lg mb-1">{featuredSong.artist}</p>
                    <p className="text-gray-500 text-sm mb-6">{featuredSong.album || "Single"}</p>
                    <Link
                      to={`/songs/${featuredSong._id}`}
                      className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-md"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Listen Now
                    </Link>
                  </div>
                </div>
              </section>
            )}

        
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-white tracking-wide flex items-center">
                  <span className="w-2.5 h-6 bg-purple-500 rounded-full mr-3"></span>
                  {searchQuery ? `Search Results (${filteredSongs.length})` : "Latest Releases"}
                </h2>
              </div>

              {latestSongs.length === 0 ? (
                <div className="text-center py-20 bg-gray-900/20 border border-gray-800 rounded-2xl">
                  <p className="text-gray-400">No songs found. Try a different search term!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {latestSongs.map((song) => (
                    <SongCard key={song._id} song={song} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
