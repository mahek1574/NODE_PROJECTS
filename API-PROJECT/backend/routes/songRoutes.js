const express = require("express");

const {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
} = require("../controllers/songController");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/", getAllSongs);
router.get("/:id", getSongById);

router.post("/", authMiddleware, adminMiddleware, createSong);

router.put("/:id", authMiddleware, adminMiddleware, updateSong);

router.delete("/:id", authMiddleware, adminMiddleware, deleteSong);

module.exports = router;
