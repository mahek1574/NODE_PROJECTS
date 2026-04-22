const { todos } = require("../data/data");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

exports.getTodos = (req, res) => {
  res.render("index", { todos });
};

exports.addForm = (req, res) => {
  res.render("add");
};
exports.createTodo = (req, res) => {
  const newTodo = {
    id: Date.now().toString(),
    title: req.body.title,
    category: req.body.category,
    image: req.file ? req.file.filename : null,
  };

  todos.push(newTodo);
  res.redirect("/");
};

exports.deleteTodo = (req, res) => {
  const index = todos.findIndex((t) => t.id === req.params.id);
  if (index !== -1) {
    todos.splice(index, 1);
  }
  res.redirect("/");
};

exports.editForm = (req, res) => {
  const todo = todos.find((t) => t.id === req.params.id);
  res.render("edit", { todo });
};

exports.updateTodo = (req, res) => {
  const todo = todos.find((t) => t.id === req.params.id);

  if (todo) {
    todo.title = req.body.title;
    todo.category = req.body.category;

    if (req.file) {
      todo.image = req.file.filename;
    }
  }

  res.redirect("/");
};

exports.upload = upload;
