import { useEffect, useState } from "react";
import axios from "axios";
import { MessageSquare, Send, User } from "lucide-react";

function CommentSection({ blogId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/comments/${blogId}`);
      setComments(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      await axios.post(
        `http://localhost:5000/comments/${blogId}`,
        { text },
        {
          withCredentials: true,
        },
      );
      setText("");
      fetchComments();
    } catch (error) {
      alert(error.response?.data?.message || "Error adding comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  return (
    <div className="comments-container">
      <div className="comments-header">
        <MessageSquare size={20} />
        <h3>Discussion ({comments.length})</h3>
      </div>

      <form className="comment-form" onSubmit={handleComment}>
        <textarea
          className="form-control"
          placeholder="What are your thoughts?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="3"
        ></textarea>
        <div className="form-footer">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            <Send size={16} />
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <div className="comment-avatar">
                <User size={16} />
              </div>
              <div className="comment-content">
                <div className="comment-meta">
                  <span className="comment-author">{comment.user?.name || "User"}</span>
                  <span className="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet. Start the conversation!</p>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
