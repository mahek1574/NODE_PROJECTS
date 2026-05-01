require("dotenv").config();

const express = require("express");
const session = require("express-session");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("public/uploads"));

app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  }),
);

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("home");
});

app.use(authRoutes);
app.use(bookRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server running on", port);
});
