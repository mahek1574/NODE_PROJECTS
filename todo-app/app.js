const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let todos = [];

app.get("/", (req, res) => {
  res.render("index", { todos });
});
app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  const newTodo = {
    id: Date.now().toString(),
    title: req.body.title,
    category: req.body.category,
  };

  todos.push(newTodo);
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  todos = todos.filter((t) => t.id !== req.params.id);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const todo = todos.find((t) => t.id === req.params.id);
  res.render("edit", { todo });
});

app.post("/edit/:id", (req, res) => {
  const todo = todos.find((t) => t.id === req.params.id);

  if (todo) {
    todo.title = req.body.title;
    todo.category = req.body.category;
  }

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
