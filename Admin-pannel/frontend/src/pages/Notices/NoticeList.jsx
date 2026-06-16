import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Plus, Search, Edit2, Trash2, X, Loader2, Calendar } from 'lucide-react';

const NoticeList = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.role === 'admin';

  const [modalOpen, setModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modalError, setModalError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const { data } = await axios.get('/api/notices');
      setNotices(data);
    } catch (error) {
      console.error('Error fetching notices', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingNotice(null);
    setTitle('');
    setDescription('');
    setModalError('');
    setModalOpen(true);
  };

  const openEditModal = (notice) => {
    setEditingNotice(notice);
    setTitle(notice.title);
    setDescription(notice.description);
    setModalError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError('');
    setSubmitting(true);

    try {
      const payload = { title, description };

      if (editingNotice) {
        await axios.put(`/api/notices/${editingNotice._id}`, payload);
      } else {
        await axios.post('/api/notices', payload);
      }

      setModalOpen(false);
      fetchNotices();
    } catch (error) {
      setModalError(error.response?.data?.message || 'Action failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await axios.delete(`/api/notices/${id}`);
        fetchNotices();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete notice.');
      }
    }
  };

  const filteredNotices = notices.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">School Notices</h1>
          <p className="text-xs text-gray-400 mt-1">General bulletin announcements and institutional updates.</p>
        </div>
        {isAdmin && (
          <button
            onClick={openAddModal}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-xl text-xs font-semibold shadow-md shadow-brand-primary/10 transition-all self-start sm:self-auto"
          >
            <Plus size={14} />
            <span>Add Notice</span>
          </button>
        )}
      </div>

      
      <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-155 dark:border-gray-800 rounded-xl px-4 py-2 max-w-md shadow-sm">
        <Search size={16} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search notices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-xs w-full text-gray-700 dark:text-gray-300 placeholder-gray-400"
        />
      </div>

      
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((n) => (
              <div
                key={n._id}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-premium flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center text-[10px] text-gray-400 font-semibold space-x-1.5 uppercase tracking-wider">
                      <Calendar size={12} />
                      <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                    </span>
                    {isAdmin && (
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => openEditModal(n)}
                          className="p-1 text-gray-400 hover:text-brand-primary rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete(n._id)}
                          className="p-1 text-gray-400 hover:text-danger rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">{n.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                    {n.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-150 dark:border-gray-800 text-center text-xs text-gray-400">
              No bulletins published yet.
            </div>
          )}
        </div>
      )}

    
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-955/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {editingNotice ? 'Edit Notice' : 'Publish Notice'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {modalError && (
                <div className="p-3 bg-danger/10 border border-danger/20 text-danger rounded-lg text-xs font-medium">
                  {modalError}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Title / Subject</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Summer Vacation Announcement"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs outline-none focus:border-brand-primary transition-colors text-gray-855 dark:text-gray-100"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Details Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide all relevant details..."
                  rows="4"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs outline-none focus:border-brand-primary transition-colors text-gray-855 dark:text-gray-100"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850 rounded-xl text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center space-x-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-xl text-xs font-semibold shadow-md shadow-brand-primary/10 transition-colors"
                >
                  {submitting && <Loader2 size={12} className="animate-spin" />}
                  <span>{editingNotice ? 'Update Bulletin' : 'Publish Bulletin'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeList;
