import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";

const app = express();
const PORT = 3000;
app.use(express.json());

app.use(helmet());


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || authHeader !== "Bearer mysecrettoken") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

app.get("/", (req, res) => {
  res.send("Home Page - accessible by anyone 🌐");
});

app.get("/secure", authMiddleware, (req, res) => {
  res.json({ message: "This is a secure route 🔒" });
});

app.get('/contact', (req,res)=>{
res.setHeader("Content-Type", "application/json");
})

app.post("/secure-post", authMiddleware, (req, res) => {
  // Check data type
  if (!req.is("application/json")) {
    return res.status(400).json({ error: "Invalid Content-Type, must be JSON" });
  }
  res.json({ message: "POST data received successfully", data: req.body });
});

// ----- 6️⃣ Start server -----
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
