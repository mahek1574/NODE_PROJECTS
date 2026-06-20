import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import Loader from "../components/Loader";

const ManageSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSongId, setEditingSongId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editArtist, setEditArtist] = useState("");
  const [editAlbum, setEditAlbum] = useState("");
  const [editCoverImage, setEditCoverImage] = useState("");
  const [editAudioUrl, setEditAudioUrl] = useState("");
  const [editError, setEditError] = useState("");
  const [editLoading, setEditLoading] = useState(false);

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
      setError("Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;

    try {
      const response = await api.delete(`/songs/${id}`);
      if (response.data.success) {
        setSongs(songs.filter((song) => song._id !== id));
      } else {
        alert(response.data.message || "Failed to delete song");
      }
    } catch (err) {
      alert("Failed to delete song");
    }
  };

  const openEditModal = (song) => {
    setEditingSongId(song._id);
    setEditTitle(song.title || "");
    setEditArtist(song.artist || "");
    setEditAlbum(song.album || "");
    setEditCoverImage(song.coverImage || "");
    setEditAudioUrl(song.audioUrl || "");
    setEditError("");
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingSongId("");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError("");
    setEditLoading(true);

    if (!editTitle || !editArtist || !editCoverImage || !editAudioUrl) {
      setEditError("Please fill in all required fields");
      setEditLoading(false);
      return;
    }

    try {
      const response = await api.put(`/songs/${editingSongId}`, {
        title: editTitle,
        artist: editArtist,
        album: editAlbum,
        coverImage: editCoverImage,
        audioUrl: editAudioUrl,
      });

      if (response.data.success) {
    
        setSongs(
          songs.map((song) =>
            song._id === editingSongId ? response.data.song : song
          )
        );
        closeEditModal();
      } else {
        setEditError(response.data.message || "Failed to update song");
      }
    } catch (err) {
      setEditError(err.response?.data?.message || "Failed to save song changes");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="flex-1 flex bg-gray-950">
      <Sidebar />
      <div className="flex-1 p-8 sm:p-10 max-w-6xl w-full">
        <h1 className="text-3xl font-extrabold text-white mb-8 tracking-wide flex items-center">
          <span className="w-2.5 h-6 bg-purple-500 rounded-full mr-3"></span>
          Manage Songs
        </h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl">
            {error}
          </div>
        ) : (
          <div className="bg-gray-900/40 border border-gray-800/85 rounded-2xl p-6 shadow-xl overflow-hidden">
            {songs.length === 0 ? (
              <p className="text-gray-400 text-center py-12">No songs found in catalog.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                      <th className="pb-3 pl-4">Cover</th>
                      <th className="pb-3">Title</th>
                      <th className="pb-3">Artist</th>
                      <th className="pb-3">Album</th>
                      <th className="pb-3 pr-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {songs.map((song) => (
                      <tr key={song._id} className="text-sm hover:bg-gray-800/20 transition-colors">
                        <td className="py-3 pl-4">
                          <img
                            src={song.coverImage || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100"}
                            alt={song.title}
                            className="w-12 h-12 object-cover rounded-xl border border-gray-800"
                          />
                        </td>
                        <td className="py-3 text-white font-semibold">{song.title}</td>
                        <td className="py-3 text-gray-300">{song.artist}</td>
                        <td className="py-3 text-gray-450">{song.album || "Single"}</td>
                        <td className="py-3 pr-4 text-right space-x-3">
                          <button
                            onClick={() => openEditModal(song)}
                            className="text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(song._id)}
                            className="text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Song Details</h2>

            {editError && (
              <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl">
                {editError}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-450 text-xs font-semibold mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-purple-500/60 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-450 text-xs font-semibold mb-1">
                  Artist *
                </label>
                <input
                  type="text"
                  value={editArtist}
                  onChange={(e) => setEditArtist(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-purple-500/60 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-455 text-xs font-semibold mb-1">
                  Album (Optional)
                </label>
                <input
                  type="text"
                  value={editAlbum}
                  onChange={(e) => setEditAlbum(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-purple-500/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-450 text-xs font-semibold mb-1">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  value={editCoverImage}
                  onChange={(e) => setEditCoverImage(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-purple-500/60 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-450 text-xs font-semibold mb-1">
                  Audio URL *
                </label>
                <input
                  type="url"
                  value={editAudioUrl}
                  onChange={(e) => setEditAudioUrl(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-purple-500/60 transition-colors"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSongs;
