import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";

const SongDetails = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSong = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/songs/${id}`);
        if (response.data.success) {
          setSong(response.data.song);
        } else {
          setError("Song not found");
        }
      } catch (err) {
        setError("Failed to fetch song details");
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  if (loading) return <Loader />;

  if (error || !song) {
    return (
      <div className="flex-1 bg-gray-950 flex flex-col items-center justify-center p-6">
        <div className="text-center py-10 bg-red-950/20 border border-red-900/30 rounded-2xl p-6 max-w-md mx-auto">
          <p className="text-red-400 font-semibold">{error || "Song details could not be loaded."}</p>
          <Link
            to="/"
            className="mt-6 inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-950 py-16 px-6 relative overflow-hidden">
    
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-semibold text-sm mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Browse
        </Link>

        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row gap-10 items-center">
        
          <div className="relative group w-64 h-64 sm:w-80 sm:h-80 flex-shrink-0">
            <div className="absolute inset-0 bg-purple-500/10 rounded-2xl blur-xl opacity-70 group-hover:opacity-90 transition-opacity"></div>
            <img
              src={song.coverImage || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60"}
              alt={song.title}
              className="relative w-full h-full object-cover rounded-2xl border border-gray-800 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60";
              }}
            />
          </div>

          
          <div className="flex-1 w-full flex flex-col justify-between self-stretch py-2">
            <div>
              <span className="text-xs font-bold text-purple-400 tracking-widest uppercase bg-purple-500/10 px-3.5 py-1 rounded-full border border-purple-500/20 inline-block mb-4">
                Now Playing
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                {song.title}
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl font-medium mb-1">
                {song.artist}
              </p>
              {song.album && (
                <p className="text-gray-500 text-sm">
                  Album: <span className="text-gray-400 font-medium">{song.album}</span>
                </p>
              )}
            </div>

          
            <div className="mt-8 pt-8 border-t border-gray-800/80">
              <div className="bg-gray-950/80 border border-gray-850 p-4 rounded-2xl shadow-inner">
                <audio
                  src={song.audioUrl}
                  controls
                  className="w-full filter invert hue-rotate-180 opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="text-xs text-gray-500 text-center mt-3 tracking-wide">
                Uploaded by {song.uploadedBy?.username || "Admin"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
