import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

// Secret key (normally .env me hoti hai)
const JWT_SECRET = "mysecretkey";

// Fake DB
interface User {
  username: string;
  password: string; // hashed password
}
let users: User[] = [];

// ✅ Signup
app.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check if user exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Password hash
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = { username, password: hashedPassword };
  users.push(newUser);

  // Generate token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "User registered successfully", token });
});

// ✅ Login
app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Generate token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
});

// ✅ Middleware: Verify Token
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    (req as any).user = user;
    next();
  });
}

// ✅ Protected Route
app.get("/profile", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "Welcome to your profile!", user: (req as any).user });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
