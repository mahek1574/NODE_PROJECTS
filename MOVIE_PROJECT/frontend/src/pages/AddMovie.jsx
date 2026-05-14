import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { movieAPI } from '../services/api';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rating: '',
    year: '',
    category: 'Action',
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    try {
      await movieAPI.addMovie(data);
      navigate('/movies');
    } catch (err) {
      alert('Error adding movie');
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Add New Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Horror">Horror</option>
            </select>
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="file" onChange={handleFileChange} accept="image/*" />
          </div>
          <button type="submit" className="submit-btn">Add Movie</button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
