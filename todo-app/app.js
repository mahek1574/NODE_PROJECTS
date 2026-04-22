const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes");


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/", todoRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
