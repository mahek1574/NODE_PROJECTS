const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");
const isLoggedIn = require("../middleware/authmiddlewere");

router.get("/", isLoggedIn, historyController.getHistory);
router.post("/clear", isLoggedIn, historyController.clearHistory);

module.exports = router;

