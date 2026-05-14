require("dotenv").config()

const express = require("express");
const session = require("express-session");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
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
      secure: false, 
    },
  }),
);


app.get("/api/auth/status", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/history", historyRoutes);

app.get("/", (req, res) => {
  res.send("Server running on port 5000 successfully");
});

const port = process.env.PORT

app.listen(port, () => {
  console.log("Server running on port", port);
});

