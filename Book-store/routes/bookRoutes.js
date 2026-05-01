const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const isLoggedIn = require("../middlewere/authmiddlewere");
const upload = require("../config/multer");

router.get("/books", bookController.getBooks);

router.get("/add-book", isLoggedIn, (req, res) => {
  res.render("books/add");
});

router.post("/add-book", isLoggedIn, upload.single("image"), bookController.addBook);

router.get("/edit/:id", isLoggedIn, bookController.editBook);
router.post("/edit/:id", isLoggedIn, upload.single("image"), bookController.updateBook);

router.get("/delete/:id", isLoggedIn, bookController.deleteBook);

module.exports = router;
