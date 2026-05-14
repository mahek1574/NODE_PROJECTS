const User = require("../model/user");

exports.getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id).populate("history");
    res.json({ movies: user.history });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching history" });
  }
};

exports.clearHistory = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.history = [];
    await user.save();
    req.session.user = user;
    res.json({ message: "History cleared successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error clearing history" });
  }
};

