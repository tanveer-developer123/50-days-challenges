import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

// Secret key (normally .env me rakhtay hain)
const JWT_SECRET = "mysecretkey";

// Fake DB
interface User {
  username: string;
  password: string; // hashed password
}
let blacklistedTokens: string[] = [];
let users: User[] = [];

// ✅ Signup
app.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const existingUser = users.find(u => u.username === username);
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Signup successful", token });
});

// ✅ Login
app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});


app.post("/logout", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (token) {
    blacklistedTokens.push(token); // token ko blacklist me dal diya
  }

  res.json({ message: "Logged out successfully" });
});

// Middleware update
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  if (blacklistedTokens.includes(token)) {
    return res.status(403).json({ message: "Token blacklisted, please login again" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    (req as any).user = user;
    next();
  });
}


// ✅ Public Route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome! Anyone can access this route." });
});

// ✅ Protected Routes
app.get("/dashboard", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "Welcome to Dashboard!", user: (req as any).user });
});

app.get("/settings", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "Settings page (only for logged-in users)." });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
