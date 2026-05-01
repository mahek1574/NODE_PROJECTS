const express = require("express")
const router = express.Router()

const authController= require("../controllers/authController")
const isLoggedIn = require("../middlewere/authMiddlewere");

router.get("/signup",(req,res)=>{
    res.render("auth/signup")
})

router.post("/signup",authController.signup);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", authController.login);

router.get("/add-book", isLoggedIn, (req, res) => {
  res.render("books/add");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;