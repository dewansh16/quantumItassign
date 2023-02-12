const jwt = require("jsonwebtoken");
const AuthUser = require("../models/AuthUser");
const jwtCheck = async (req, res, next) => {
  try {
    const token = req.headers.auth_token;
    if (!token) {
      return res.json({
        error: "please authorrise",
      });
    }
    const id = jwt.verify(req.headers.auth_token, process.env.SECRET)._id;
    if (!id) {
      return res.json({
        err: "Invalid credentials",
      });
    } else {
      const user = await AuthUser.findById(id);
      if (!user) {
        return res.json({
          err: "Invalid credentials",
        });
      }
      req.user = user;
    }
    next();
  } catch (err) {
    return res.status(400).json({
      err: err.message,
    });
  }
};

module.exports = jwtCheck;
