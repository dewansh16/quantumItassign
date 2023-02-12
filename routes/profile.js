const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const AuthUser = require("../models/AuthUser");
router.get("/", async (req, res) => {
  if (req.headers.auth_token === undefined) {
    res.json({ auth_token: "required" });
  } else {
    const id = jwt.verify(await req.headers.auth_token, process.env.SECRET)._id;
    if (!id) {
      res.json({ token: "Invalid token" });
    } else {
      const profile = await AuthUser.findById(id);
      if (profile) {
        res.json({
          firstname: profile.firstname,
          lastname: profile.lastname,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
        });
      } else {
        res.json({ auth_token: "Invalid Token" });
      }
    }
  }
});
module.exports = router;
