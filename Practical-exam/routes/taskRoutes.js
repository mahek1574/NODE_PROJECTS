const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");

router.get("/tasks", protect, taskController.getTasks);

router.post("/tasks", protect, taskController.createTask);

router.post("/tasks/delete/:id", protect, taskController.deleteTask);

router.post("/tasks/update/:id", protect, taskController.updateTask);

module.exports = router;
