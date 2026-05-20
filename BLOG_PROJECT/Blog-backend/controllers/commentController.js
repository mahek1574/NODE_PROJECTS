const Comment = require("../model/comment");
const Blog = require("../model/blog");

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    const newComment = await Comment.create({
      text,
      user: req.user.id,
      blogId: blogId,
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({
      blogId: blogId,
    }).populate("user");

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
