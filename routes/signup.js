const express = require("express");
const router = express.Router();
const AuthUser = require("../models/AuthUser");
const bcrypt = require("bcryptjs");
router.post("/", async (req, res) => {
  if (
    req.body.username === undefined ||
    req.body.email === undefined ||
    req.body.dob === undefined ||
    req.body.password === undefined
  ) {
    res.json({
      username: req.body.username || "required",
      email: req.body.email || "required",
      dob: req.body.dob || "required",
      password: req.body.password || "required",
    });
  } else if (!req.body.email.includes(".") || !req.body.email.includes("@")) {
    res.json({ email: "Invalid Email" });
  } else if (req.body.password.length < 8) {
    res.json({ password: "Password should be minimum 8 characters" });
  } else {
    const exists = await AuthUser.findOne({ email: req.body.email })
      .then()
      .catch((err) => console.log(err));
    if (exists) {
      res.json({ email: "Already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = new AuthUser({
        username: req.body.username,
        email: req.body.email,
        dob: req.body.dob,
        password: hashedPassword,
      });
      user
        .save()
        .then(() => {
          res.json({ email: "User Created Successfully" });
        })
        .catch((err) => res.send(err));
    }
  }
});

module.exports = router;
