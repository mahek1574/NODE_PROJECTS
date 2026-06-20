import React from "react";
import { Link } from "react-router-dom";

const SongCard = ({ song }) => {
  return (
    <div className="group bg-gray-900/60 backdrop-blur-md border border-gray-800/80 rounded-2xl p-4 transition-all duration-300 hover:translate-y-[-4px] hover:border-purple-500/30 hover:bg-gray-900/80 shadow-lg hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
    
      <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-800">
        <img
          src={song.coverImage || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"}
          alt={song.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <span className="text-xs font-semibold text-purple-400 tracking-wider uppercase">Now Streaming</span>
        </div>
      </div>

  
      <div className="mb-4">
        <h3 className="text-white font-bold text-lg truncate group-hover:text-purple-400 transition-colors" title={song.title}>
          {song.title}
        </h3>
        <p className="text-gray-400 text-sm truncate" title={song.artist}>
          {song.artist}
        </p>
        {song.album && (
          <p className="text-gray-500 text-xs truncate mt-1">
            Album: {song.album}
          </p>
        )}
      </div>

  
      <Link
        to={`/songs/${song._id}`}
        className="block text-center w-full bg-gray-850 hover:bg-purple-600 text-white font-semibold text-sm py-2.5 px-4 rounded-xl border border-gray-800 group-hover:border-transparent transition-all duration-200"
      >
        View Details
      </Link>
    </div>
  );
};

export default SongCard;
