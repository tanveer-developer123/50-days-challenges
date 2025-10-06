import express from "express";
import session from "express-session";
import passport from "passport";
import "./auth/google"; // Import Google strategy

const app = express();

app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

app.get("/profile", (req, res) => {
  res.send("Welcome to your profile!");
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
