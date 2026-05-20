const Blog = require("../model/blog");
const User = require("../model/user");
const Notification = require("../model/notification");


exports.createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    let imageUrl = "";

    if (req.file) {
      imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized: User information missing",
      });
    }

    const newBlog = await Blog.create({
      title,
      content: content || "",
      category: category || "General",
      image: imageUrl,
      author: req.user.id,
    });

    try {
      const author = await User.findById(req.user.id);
      const users = await User.find({ _id: { $ne: req.user.id } });
      
      if (users.length > 0 && author) {
        const notifications = users.map((u) => ({
          recipient: u._id,
          sender: req.user.id,
          blog: newBlog._id,
          message: `${author.name} published a new story: "${newBlog.title}"`,
        }));
        await Notification.insertMany(notifications);
      }
    } catch (notifError) {
      console.error("Failed to create notifications:", notifError);
    }

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const category = req.query.category;

    let blogs;

    if (category) {
      blogs = await Blog.find({ category }).populate("author");
    } else {
      blogs = await Blog.find().populate("author");
    }

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    const isAdmin = req.user.role === "admin";
    if (blog.author.toString() !== req.user.id && !isAdmin) {
      return res.status(403).json({
        message: "You can update only your blog",
      });
    }

    let updateData = { ...req.body };
    if (req.file) {
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    const isAdmin = req.user.role === "admin";
    if (blog.author.toString() !== req.user.id && !isAdmin) {
      return res.status(403).json({
        message: "You can delete only your blog",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    const userId = req.user.id;

    
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId
      );

      await blog.save();

      return res.status(200).json({
        message: "Blog unliked successfully"
      });
    }

    
    blog.likes.push(userId);

    await blog.save();

    res.status(200).json({
      message: "Blog liked successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
