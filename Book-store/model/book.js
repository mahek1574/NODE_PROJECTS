const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  image: {
    type: String
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
  year: {
    type: Number,
  },
  category: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Book", bookSchema);
