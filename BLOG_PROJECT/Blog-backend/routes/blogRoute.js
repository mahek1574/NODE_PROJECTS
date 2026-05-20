const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  likeBlog
} = require("../controllers/blogController");

router.post("/", authMiddleware, upload.single("image"), createBlog);

router.get("/", getAllBlogs);

router.get("/:id", getSingleBlog);

router.put("/:id", authMiddleware, upload.single("image"), updateBlog);


router.delete("/:id", authMiddleware, deleteBlog);

router.post("/like/:id", authMiddleware, likeBlog);

module.exports = router;
