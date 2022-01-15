const express = require("express");
const app = express();
const path = require("path");
app.use(
  express.static("build")
); /* this line tells Express to use the public folder as our static folder from which we can serve static files*/

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/profile", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/createad", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/yourads", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/mycalendar", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/allads", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/ad/:id", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/user/:id", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/notifications", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
