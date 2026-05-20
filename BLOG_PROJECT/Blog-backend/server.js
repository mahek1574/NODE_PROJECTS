require("dotenv").config();
const express = require("express");

const cors = require("cors");
const connectDB = require("./config/db")
connectDB();


const app = express()
const authRoutes = require("./routes/authRoute")
const blogRoutes = require("./routes/blogRoute");
const commentRoutes = require("./routes/commentRoute");
const notificationRoutes = require("./routes/notificationRoute");
const cookieParser = require("cookie-parser");

const path = require("path");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRoutes);
app.use("/blogs",blogRoutes);
app.use("/comments", commentRoutes);
app.use("/notifications", notificationRoutes);


app.get("/",(req,res)=>{
    res.send("api running...")
})

const port = process.env.PORT
app.listen(port,()=>{
    console.log("server running on port",port);
})



