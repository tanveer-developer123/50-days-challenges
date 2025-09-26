import express from "express";
import AppError from "./utils/AppError";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// ✅ Example Routes

// Home
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// 404 Not Found Example
app.get("/user", (req, res) => {
  // maan lo DB me user nahi mila
  throw new AppError("User not found!", 404);
});

// 400 Bad Request Example
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and Password are required!", 400);
  }

  res.json({ success: true, message: "Login success!" });
});

// 401 Unauthorized Example
app.get("/admin", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError("Unauthorized! Token required.", 401);
  }

  res.json({ success: true, message: "Welcome Admin!" });
});

// 500 Internal Server Error Example
app.get("/crash", (req, res) => {
  throw new Error("Unexpected server crash!");
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
    // stack sirf development me dikhana (production me hata dena)
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
