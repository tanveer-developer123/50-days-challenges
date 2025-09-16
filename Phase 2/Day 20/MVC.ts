import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { createUser } from "./model/userModel";

const app = express();
const PORT = 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// home page
app.get("/", (req, res) => {
  res.render("index");
});

// contact form page
app.get("/contact", (req, res) => {
  res.render("contact");
});

// 📌 form submit -> save to DB
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await createUser(name, email, message);
    res.send("User saved successfully!");
    // ya phir redirect bhi kar sakte ho:
    // res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving user.");
  }
});

// users page
app.get("/users", async (req, res) => {
  // model ka getAllUsers function use karo
  res.send("All users page aa jayega yahan se");
});

app.listen(PORT, ()=>{
  console.log(`Server is Running on localhost:${PORT}`)
})