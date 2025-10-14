// src/App.ts
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import passport from "../auth/googleAuth";
import authRoutes from "../routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Make user available in templates
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = req.user;
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.render("index", { user: req.user });
});

// Protected route middleware
function ensureAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  res.redirect("/");
}

app.get("/profile", ensureAuth, (req: Request, res: Response) => {
  // req.user will be the object we saved in passport callback
  res.render("profile", { user: req.user });
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
