const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  const { name } = req.body;

  await Category.create({ name });

  res.redirect("/tasks");
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find();

  res.json(categories);
};

exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);

  res.redirect("/tasks");
};
