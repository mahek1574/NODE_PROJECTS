const Book = require("../model/book");

exports.addBook = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const rating = req.body.rating;
    const year = req.body.year;
    const category = req.body.category;
    const image = req.file ? req.file.filename : "";

    const newBook = new Book({
      title,
      description,
      rating,
      year,
      category,
      image,
      userId: req.session.user._id,
    });

    await newBook.save();
    res.redirect("/books");
  } catch (err) {
    console.log(err);
    res.send("error while add book");
  }
};
exports.getBooks = async (req, res) => {
  try {
    let books = await Book.find();
    if (req.query.search) {
      books = books.filter(
        (book) => book.title.toLowerCase() === req.query.search.toLowerCase(),
      );
    }

  
    if (req.query.category) {
      books = books.filter((book) => book.category === req.query.category);
    }

    res.render("books/index", { books });
  } catch (err) {
    console.log(err);
    res.send("error fetching books");
  }
};
exports.editBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render("books/edit", { book });
  } catch (err) {
    console.log(err);
    res.send("error fetching book for edit");
  }
};
exports.updateBook = async (req, res) => {
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

    await Book.findByIdAndUpdate(req.params.id, updateData);

    res.redirect("/books");
  } catch (err) {
    console.log(err);
    res.send("error updating book");
  }
};
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    res.redirect("/books");
  } catch (err) {
    console.log(err);
    res.send("error deleting book");
  }
};
