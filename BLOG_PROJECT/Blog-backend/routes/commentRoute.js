const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addComment,
  getCommentsByBlog,
} = require("../controllers/commentController");


router.post("/:blogId", authMiddleware, addComment);


router.get("/:blogId", getCommentsByBlog);

module.exports = router;
