const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todoController");

router.get("/", todoController.getTodos);

router.get("/add", todoController.addForm);
router.post(
  "/add",todoController.upload.single("image"),
  todoController.createTodo,
);

router.get("/delete/:id", todoController.deleteTodo);

router.get("/edit/:id", todoController.editForm);
router.post(
  "/edit/:id",
  todoController.upload.single("image"),
  todoController.updateTodo
);

module.exports = router;
