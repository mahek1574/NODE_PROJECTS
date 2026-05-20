import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Home, PenSquare, UserPlus, LogIn, Layout, Bell, LogOut, User } from "lucide-react";

function Navbar() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/profile", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      setUser(null);
    }
  };


  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/notifications", {
        withCredentials: true,
      });
      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };


  useEffect(() => {
    fetchUser();
  }, [location.pathname]);
  useEffect(() => {
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 10000);
      return () => clearInterval(interval);
    } else {
      setNotifications([]);
    }
  }, [user]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = async (n) => {
    try {
      if (!n.isRead) {
        await axios.put(`http://localhost:5000/notifications/${n._id}/read`, {}, {
          withCredentials: true,
        });
        setNotifications((prev) =>
          prev.map((item) => (item._id === n._id ? { ...item, isRead: true } : item))
        );
      }
      setShowDropdown(false);
      navigate(`/blog/${n.blog}`);
    } catch (error) {
      console.error("Error handling notification click:", error);
      setShowDropdown(false);
      navigate(`/blog/${n.blog}`);
    }
  };
  const handleMarkAllAsRead = async () => {
    try {
      await axios.put("http://localhost:5000/notifications/read-all", {}, {
        withCredentials: true,
      });
      setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await axios.post("http://localhost:5000/auth/logout", {}, {
          withCredentials: true,
        });
        setUser(null);
        setNotifications([]);
        alert("Logged out successfully");
        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error);
        alert("Logout failed");
      }
    }
  };
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <Layout size={24} />
          <span>DevBlog</span>
        </Link>

        <div className="nav-links">
          {user ? (
            <>
              <Link to="/" className="nav-link">
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link to="/create-blog" className="nav-link">
                <PenSquare size={18} />
                <span>Write</span>
              </Link>

        
              <div className="notifications-container" ref={dropdownRef}>
                <button
                  className={`notifications-bell ${showDropdown ? "active" : ""}`}
                  onClick={() => setShowDropdown((prev) => !prev)}
                  title="Notifications"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && <span className="notifications-badge">{unreadCount}</span>}
                </button>

                {showDropdown && (
                  <div className="notifications-dropdown">
                    <div className="notifications-header">
                      <h3>Notifications</h3>
                      {unreadCount > 0 && (
                        <button className="mark-read-btn" onClick={handleMarkAllAsRead}>
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="notifications-list">
                      {notifications.length === 0 ? (
                        <div className="notification-empty">No notifications yet</div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n._id}
                            className={`notification-item ${!n.isRead ? "unread" : ""}`}
                            onClick={() => handleNotificationClick(n)}
                          >
                            <div className="notification-dot-wrapper">
                              {!n.isRead && <span className="notification-dot"></span>}
                            </div>
                            <div className="notification-body">
                              <p className="notification-message">{n.message}</p>
                              <span className="notification-time">{formatTime(n.createdAt)}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              
              <span className="nav-user-greeting">
                <User size={16} className="user-icon" />
                <span className="user-name">Hi, {user.name}</span>
              </span>

              <button onClick={handleLogout} className="btn btn-outline nav-btn logout-btn">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link to="/register" className="nav-link">
                <UserPlus size={18} />
                <span>Join</span>
              </Link>
              <Link to="/login" className="btn btn-primary nav-btn">
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
