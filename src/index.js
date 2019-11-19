const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/dev.js");

const app = express();

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

app.get("/", (req, res) => {
  res.send("Hi there!");
});

app.listen(3000, () => console.log("Listening on port 3000"));
