import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const AddSong = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!title || !artist || !coverImage || !audioUrl) {
      setError("Please fill in all required fields (Title, Artist, Cover Image URL, Audio URL)");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/songs", {
        title,
        artist,
        album,
        coverImage,
        audioUrl,
      });

      if (response.data.success) {
        setSuccess("Song added successfully!");
        setTitle("");
        setArtist("");
        setAlbum("");
        setCoverImage("");
        setAudioUrl("");
        setTimeout(() => {
          navigate("/admin/manage");
        }, 1200);
      } else {
        setError(response.data.message || "Failed to add song");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit song details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex bg-gray-950">
      <Sidebar />
      <div className="flex-1 p-8 sm:p-10 max-w-4xl">
        <h1 className="text-3xl font-extrabold text-white mb-8 tracking-wide flex items-center">
          <span className="w-2.5 h-6 bg-purple-500 rounded-full mr-3"></span>
          Add New Song
        </h1>

        <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-xl flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm p-4 rounded-xl flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Song Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Blinding Lights"
                  className="w-full bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 outline-none transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Artist
                </label>
                <input
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="e.g. The Weeknd"
                  className="w-full bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">
                Album (Optional)
              </label>
              <input
                type="text"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="e.g. After Hours"
                className="w-full bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">
                Cover Image URL *
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/cover-image.jpg"
                className="w-full bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 outline-none transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">
                Audio Stream URL *
              </label>
              <input
                type="url"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                placeholder="https://example.com/song-audio.mp3"
                className="w-full bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 outline-none transition-all duration-200"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md shadow-purple-500/10 disabled:opacity-50 mt-4 cursor-pointer"
            >
              {loading ? "Adding Song..." : "Add Song"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSong;
