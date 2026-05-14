import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

export const authAPI = {
  signup: (data) => API.post('/auth/signup', data),
  login: (data) => API.post('/auth/login', data),
  logout: () => API.post('/auth/logout'),
  status: () => API.get('/auth/status'),
};

export const movieAPI = {
  getMovies: (params) => API.get('/movies', { params }),
  getDetails: (id) => API.get(`/movies/${id}`),
  addMovie: (formData) => API.post('/movies/add', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateMovie: (id, formData) => API.post(`/movies/update/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteMovie: (id) => API.delete(`/movies/delete/${id}`),
};

export const wishlistAPI = {
  getWishlist: () => API.get('/wishlist'),
  toggle: (id) => API.post(`/wishlist/toggle/${id}`),
};

export const historyAPI = {
  getHistory: () => API.get('/history'),
  clear: () => API.post('/history/clear'),
};

export default API;
