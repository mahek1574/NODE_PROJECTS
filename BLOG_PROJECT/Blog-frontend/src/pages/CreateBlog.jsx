import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Image, Upload, Send, X } from "lucide-react";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("http://localhost:5000/blogs", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message || "Story published!");
      navigate("/");
    } catch (error) {
      console.error("Create Blog Error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || "Error creating blog. Please check your connection and try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container fade-in">
      <div className="form-container card">
        <h1 className="form-title">Write a new story</h1>
        <p className="form-subtitle">Share your thoughts and ideas with the world.</p>

        <form onSubmit={handleCreateBlog}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Give your story a catchy title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select 
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Featured Image</label>
            <div className="image-upload-wrapper">
              {preview ? (
                <div className="image-preview-container">
                  <img src={preview} alt="Preview" className="image-preview" />
                  <button 
                    type="button" 
                    className="remove-image"
                    onClick={() => { setImage(null); setPreview(null); }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="upload-placeholder">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <Upload size={32} />
                  <span>Click to upload a cover image</span>
                  <span className="upload-hint">JPG, PNG or WebP (max. 5MB)</span>
                </label>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              placeholder="Tell your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="10"
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Send size={18} />
              {loading ? "Publishing..." : "Publish Story"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
