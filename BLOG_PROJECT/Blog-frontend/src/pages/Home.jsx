import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search, Tag, ArrowRight, Calendar } from "lucide-react";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const url = category 
        ? `http://localhost:5000/blogs?category=${category}` 
        : "http://localhost:5000/blogs";
      const res = await axios.get(url);
      setBlogs(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  return (
    <div className="container fade-in">
      <header className="hero">
        <h1>Stay Curious.</h1>
        <p>Discover stories, thinking, and expertise from writers on any topic.</p>
        
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by category (e.g. Tech, Lifestyle)..." 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {category && (
            <button className="clear-btn" onClick={() => setCategory("")}>Clear</button>
          )}
        </div>
      </header>

      <section className="blog-section">
        <div className="section-header">
          <h2>Latest Stories</h2>
          <div className="filter-tags">
            {["Technology", "Design", "Business", "Health"].map(cat => (
              <button 
                key={cat} 
                className={`tag-btn ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading amazing stories...</div>
        ) : (
          <div className="blog-grid">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <article key={blog._id} className="blog-card card">
                  <div className="blog-card-image">
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} />
                    ) : (
                      <div className="image-placeholder">
                        <Tag size={40} />
                      </div>
                    )}
                    <span className="blog-category">{blog.category}</span>
                  </div>
                  
                  <div className="blog-card-content">
                    <div className="blog-meta">
                      <span className="blog-author">By {blog.author?.name || "Anonymous"}</span>
                      <span className="blog-date">
                        <Calendar size={14} />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-excerpt">
                      {blog.content.substring(0, 100)}...
                    </p>
                    
                    <Link to={`/blog/${blog._id}`} className="read-more">
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="no-blogs">No blogs found for this category.</div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
