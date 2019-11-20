const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/dev.js");

require("./models/User");

const requireAuth = require("./middleware/requireAuth");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

mongoose.connect(keys.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo instance.");
});
mongoose.connection.on("error", error => {
  console.error("Error connecting to Mongo", error);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email is ${req.user.email}`);
});

app.listen(3000, () => console.log("Listening on port 3000"));
