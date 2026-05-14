const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const isLoggedIn = require("../middleware/authmiddlewere");

router.get("/", isLoggedIn, wishlistController.getWishlist);
router.post("/toggle/:id", isLoggedIn, wishlistController.toggleWishlist);

module.exports = router;

