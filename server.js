//* import -> require
require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("mern:server");

//* app
const app = express();

//* middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

//* routes -> all express routes start with /api
app.use("/api/users", require("./routes/api/users"));
app.use("/api/attractions", require("./routes/api/attractions"));

app.get("/api", (req, res) => {
  res.json({ msg: "Hello World!" });
});

//? just for react router
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//* listen
//? Heroku opens Port 3300
const port = process.env.PORT || 3000;

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});
