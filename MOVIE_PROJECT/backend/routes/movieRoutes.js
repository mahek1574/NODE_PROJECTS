const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const isLoggedIn = require("../middleware/authmiddlewere");
const upload = require("../config/multer");

router.get("/", movieController.getMovies);

router.post(
  "/add",
  isLoggedIn,
  upload.single("image"),
  movieController.addMovie,
);

router.get("/edit/:id", isLoggedIn, movieController.editMovie);

router.post(
  "/update/:id",
  isLoggedIn,
  upload.single("image"),
  movieController.updateMovie,
);

router.delete("/delete/:id", isLoggedIn, movieController.deleteMovie);

router.get("/:id", movieController.getMovieDetails); 

module.exports = router;
