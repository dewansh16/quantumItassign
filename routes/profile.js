const express = require("express");
const AuthUser = require("../models/AuthUser");
const router = express.Router();
router.get("/", async (req, res) => {
  res.json({
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
    dob: req.user.dob,
  });
});

router.get("/all", async (req, res) => {
  const all = await AuthUser.find().select("-password");
  res.json(all);
});

module.exports = router;
