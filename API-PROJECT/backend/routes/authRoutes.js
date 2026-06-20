const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", authMiddleware, getMe);

module.exports = router;
