const User = require("../model/user");
const Movie = require("../model/movie");

exports.toggleWishlist = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const movieId = req.params.id;

    const user = await User.findById(userId);
    const movieIndex = user.wishlist.findIndex(id => id.toString() === movieId);

    let added = false;
    if (movieIndex > -1) {
      user.wishlist.splice(movieIndex, 1);
    } else {
      user.wishlist.push(movieId);
      added = true;
    }

    await user.save();
    req.session.user = user;
    
    res.json({ message: added ? "Added to wishlist" : "Removed from wishlist", wishlist: user.wishlist, added });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error toggling wishlist" });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id).populate("wishlist");
    res.json({ movies: user.wishlist });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching wishlist" });
  }
};

