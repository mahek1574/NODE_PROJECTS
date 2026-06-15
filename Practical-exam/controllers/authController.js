const User = require("../models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) return res.send("User exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.redirect("/login");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.send("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.send("Invalid credentials");

  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 86400000,
  });

  res.redirect("/tasks");
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
