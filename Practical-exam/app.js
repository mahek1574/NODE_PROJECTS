require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(methodOverride("_method"));

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/taskRoutes"));
app.use("/", require("./routes/categoryRoutes"));


app.get("/", (req, res) => {
  res.redirect("/login");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
