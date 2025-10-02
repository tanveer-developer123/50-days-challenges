import express, { Request, Response } from "express";
import session from "express-session";

const app = express();
app.use(express.json());

// ✅ Session Middleware
app.use(
  session({
    secret: "mySessionSecret", // ye .env me rakho
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // agar HTTPS hoga to true karna
  })
);

// ✅ Login Route
app.post("/login", (req: Request, res: Response) => {
  const { username } = req.body;

  // Session me user save
  (req.session as any).user = { username };

  res.json({ message: "Login successful", user: username });
});

// ✅ Protected Route
app.get("/dashboard", (req: Request, res: Response) => {
  if (!(req.session as any).user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ message: "Welcome!", user: (req.session as any).user });
});

// ✅ Logout Route
app.post("/logout", (req: Request, res: Response) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid"); // default cookie ka naam
    res.json({ message: "Logged out successfully" });
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
