const Movie = require("../model/movie");
const User = require("../model/user");

exports.addMovie = async (req, res) => {
  try {
    const { title, description, rating, year, category } = req.body;
    const image = req.file ? req.file.filename : "";

    const newMovie = new Movie({
      title,
      description,
      rating,
      year,
      category,
      image,
      userId: req.session.user._id,
    });

    await newMovie.save();
    res.status(201).json({ message: "Movie added successfully", movie: newMovie });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding movie" });
  }
};

exports.getMovies = async (req, res) => {
  try {
    let movies = await Movie.find();
    if (req.query.search) {
      movies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(req.query.search.toLowerCase()),
      );
    }

    if (req.query.category) {
      movies = movies.filter((movie) => movie.category === req.query.category);
    }

    res.json({ movies });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching movies" });
  }
};

exports.editMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ movie });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching movie for edit" });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      rating: req.body.rating,
      year: req.body.year,
      category: req.body.category,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating movie" });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting movie" });
  }
};

exports.getMovieDetails = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (req.session.user) {
      const user = await User.findById(req.session.user._id);
      
      const index = user.history.findIndex(id => id.toString() === movie._id.toString());
      if (index > -1) {
        user.history.splice(index, 1);
      }
      
      user.history.unshift(movie._id);
      
      if (user.history.length > 10) {
        user.history.pop();
      }
      
      await user.save();
      req.session.user = user;
    }
    
    res.json({ movie });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching movie details" });
  }
};