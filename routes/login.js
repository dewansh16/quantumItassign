const express = require("express");
const jwt = require("jsonwebtoken");
const AuthUser = require("../models/AuthUser");
const bcrypt = require("bcryptjs");
router = express.Router();

router.post("/", async (req, res) => {
  if (req.body.username === undefined) {
    if (req.body.password === undefined) {
      res.json({ email: "required", password: "required" });
    } else {
      res.json({ email: "required" });
    }
  } else if (req.body.password === undefined) {
    res.json({ password: "required" });
  } else {
    const exists = await AuthUser.findOne({ username: req.body.username });

    if (exists) {
      const pass = await bcrypt.compare(req.body.password, exists.password);
      if (pass) {
        const token = jwt.sign({ _id: exists._id }, process.env.SECRET, {
          expiresIn: "1d",
        });
        res.json({ email: "Successfully logged in", auth_token: token });
      } else {
        res.json({ email: "Password is incorrect" });
      }
    } else {
      res.json({ email: "User Does not exist" });
    }
  }
});
module.exports = router;
