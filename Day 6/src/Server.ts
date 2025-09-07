import express, { Request, Response } from "express";
import path from "path";

const app = express();
const PORT = 3000;


// ✅ Middleware to serve static files
app.use(express.static(path.join(__dirname, "../public")));

// ✅ Example API route
app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript!" });
});


// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
