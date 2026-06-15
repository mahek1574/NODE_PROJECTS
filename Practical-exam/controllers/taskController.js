const Task = require("../models/Task");
const User = require("../models/User");

exports.getTasks = async (req, res) => {
  let tasks;

  if (req.user.role === "admin") {
    tasks = await Task.find().populate("owner").populate("category");
  } else {
    tasks = await Task.find({ owner: req.user.id }).populate("category");
  }

  res.render("taskList", { tasks, user: req.user });
};

exports.createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    owner: req.user.id,
  });

  await User.findByIdAndUpdate(req.user.id, {
    $push: { tasks: task._id },
  });

  res.redirect("/tasks");
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.send("Task not found");

  if (req.user.role !== "admin" && task.owner.toString() !== req.user.id) {
    return res.send("Access Denied");
  }

  await Task.findByIdAndDelete(req.params.id);

  res.redirect("/tasks");
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.send("Task not found");

  if (req.user.role !== "admin" && task.owner.toString() !== req.user.id) {
    return res.send("Access Denied");
  }

  await Task.findByIdAndUpdate(req.params.id, req.body);

  res.redirect("/tasks");
};
