const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.use(cors());
const authmiddleware = require("./middleware/authmiddleware");
const PORT = process.env.PORT || 8000;
//Routes
const signuproute = require("./routes/signup");
app.use("/api/signup", signuproute);
const loginroute = require("./routes/login");
app.use("/api/login", loginroute);
const profileroute = require("./routes/profile");
app.use("/api/profile", authmiddleware, profileroute);

//Connecting Database
mongoose.connect(
  process.env.URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB Connnected");
  }
);
//GET Request
app.get("/api", (req, res) => {
  res.send(`Hello User`);
});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`);
});
