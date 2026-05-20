import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import CommentSection from "../components/commentSection";
import { Heart, Edit3, Trash2, Calendar, User, Tag, ArrowLeft } from "lucide-react";

function SingleBlog() {
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/profile", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.log("Not logged in");
    }
  };

  const fetchSingleBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/blogs/${id}`);
      setBlog(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert("Please login to like this blog");
      return;
    }
    try {
      await axios.post(`http://localhost:5000/blogs/like/${id}`, {}, {
        withCredentials: true,
      });
      fetchSingleBlog();
    } catch (error) {
      alert(error.response?.data?.message || "Error liking blog");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/blogs/${id}`, {
          withCredentials: true,
        });
        navigate("/");
      } catch (error) {
        alert(error.response?.data?.message || "Error deleting blog");
      }
    }
  };

  useEffect(() => {
    fetchSingleBlog();
    fetchUser();
  }, []);

  if (loading) {
    return <div className="loading">Loading story...</div>;
  }

  if (!blog) {
    return <div className="container"><h2>Blog not found</h2></div>;
  }

  const isAdmin = user && user.role === "admin";
  const isAuthor = (user && blog.author && user._id === blog.author._id) || isAdmin;
  const isLiked = blog.likes?.includes(user?._id);

  return (
    <div className="container fade-in">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} /> Back to stories
      </Link>

      <article className="blog-detail">
        <header className="blog-header">
          <span className="blog-detail-category">{blog.category}</span>
          <h1 className="blog-detail-title">{blog.title}</h1>
          
          <div className="blog-detail-meta">
            <div className="author-info">
              <div className="author-avatar">
                <User size={22} />
              </div>
              <div className="author-details">
                <span className="author-name">{blog.author?.name || "Unknown Author"}</span>
                <span className="publish-date">
                  <Calendar size={12} />
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
              </div>
            </div>

            <div className="blog-actions">
              <button 
                className={`like-btn ${isLiked ? "liked" : ""}`} 
                onClick={handleLike}
              >
                <Heart size={20} fill={isLiked ? "#f43f5e" : "transparent"} color={isLiked ? "#f43f5e" : "currentColor"} />
                <span>{blog.likes?.length || 0}</span>
              </button>

              {isAuthor && (
                <div className="author-controls">
                  <Link to={`/edit/${blog._id}`} className="btn btn-outline btn-sm" title="Edit story">
                    <Edit3 size={18} />
                  </Link>
                  <button onClick={handleDelete} className="btn btn-danger btn-sm" title="Delete story">
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {blog.image && (
          <div className="blog-featured-image">
            <img src={blog.image} alt={blog.title} />
          </div>
        )}

        <div className="blog-content">
          {blog.content ? (
            blog.content.split("\n").map((para, i) => (
              para.trim() && <p key={i}>{para}</p>
            ))
          ) : (
            <p>No content available for this story.</p>
          )}
        </div>

        <footer className="blog-footer">
          <CommentSection blogId={id} />
        </footer>
      </article>
    </div>
  );
}

export default SingleBlog;
