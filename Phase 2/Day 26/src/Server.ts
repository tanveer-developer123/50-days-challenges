import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";

const app = express();
const PORT = 3000;

// ✅ Middleware
app.use(bodyParser.json());

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// ✅ Root check
app.get("/", (req, res) => {
  res.send("🚀 Blog API is running...");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
