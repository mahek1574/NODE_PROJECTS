const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.send("Access Denied: Admin Only");
  }
  next();
};

module.exports = isAdmin;
