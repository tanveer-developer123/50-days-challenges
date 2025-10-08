import express from "express";
import session from "express-session";
import passport from "passport";
import "./auth/google"; 
import "./auth/github"

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

// Start Google OAuth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful login
    res.redirect("/profile");
  }
);

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub callback
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

app.get("/profile", (req, res) => {
  if (!req.user) return res.redirect("/");

  const user: any = req.user;
  res.send(`
    <h1>Welcome, ${user.displayName}</h1>
    <p>Email: ${user.emails?.[0].value}</p>
    <img src="${user.photos?.[0].value}" alt="Profile Photo" />
  `);
});


app.listen(5000, () => console.log("Server running on http://localhost:5000"));
