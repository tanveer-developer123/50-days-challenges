const express = require("express");
const app = express();
const PORT = 3000;

// view engine set
app.set("view engine", "ejs");

// static files serve
app.use(express.static("public"));

// routes
app.get("/", (req, res) => {
  const user = "Malik";
  const fruits = ["Apple", "Mango", "Orange"];

  res.render("index", { user, fruits });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
