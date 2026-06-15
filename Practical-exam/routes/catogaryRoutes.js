const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const protect = require("../middleware/authMiddleware");

router.post("/category", protect, categoryController.createCategory);

router.get("/categories", protect, categoryController.getCategories);

router.post("/category/delete/:id", protect, categoryController.deleteCategory);

module.exports = router;
