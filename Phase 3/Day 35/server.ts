// app.ts
import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
const PORT = 5000;

/*
  WARNING: Use env vars in production. For learning/testing we define secrets here.
  In production: process.env.ACCESS_TOKEN_SECRET, process.env.REFRESH_TOKEN_SECRET
*/
const ACCESS_TOKEN_SECRET = "myAccessSecret";
const REFRESH_TOKEN_SECRET = "myRefreshSecret";

// ---- Fake "DB" ----
interface User {
  username: string;
  password: string; // hashed
  role: "admin" | "editor" | "user";
}
let users: User[] = [];
let refreshTokens: string[] = []; // active refresh tokens

// Sample resource that admin/editor can manage
interface Item {
  id: number;
  title: string;
  content: string;
}
let items: Item[] = [];
let nextItemId = 1;

// ---- Utility: generate tokens (include role in payload) ----
function generateAccessToken(payload: { username: string; role: string }) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}
function generateRefreshToken(payload: { username: string; role: string }) {
  const token = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  refreshTokens.push(token);
  return token;
}

// ---- Seed default admin user on startup (username: admin, password: admin) ----
(async function seedAdmin() {
  const adminExists = users.find(u => u.username === "admin");
  if (!adminExists) {
    const hashed = await bcrypt.hash("admin", 10);
    users.push({ username: "admin", password: hashed, role: "admin" });
    console.log("Seeded admin user -> username: admin, password: admin");
  }
})();

// ---- Middleware: authenticate JWT and attach `req.user` ----
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    // `user` will be the payload we signed: { username, role, iat, exp }
    (req as any).user = user;
    next();
  });
}

// ---- Middleware: authorize by roles ----
function authorizeRoles(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !user.role) return res.status(401).json({ message: "Unauthorized" });
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
}

// ---- Routes ----
app.get("/", (req, res) => res.send("Server Home (RBAC example)"));

// ---- Signup (default role = user). Admin can create other-role users via admin route ----
app.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "username and password required" });

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed, role: "user" });
  const accessToken = generateAccessToken({ username, role: "user" });
  const refreshToken = generateRefreshToken({ username, role: "user" });
  res.json({ message: "Signup successful", accessToken, refreshToken });
});

// ---- Login (returns access + refresh tokens with role in payload) ----
app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "username and password required" });

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid password" });

  const accessToken = generateAccessToken({ username: user.username, role: user.role });
  const refreshToken = generateRefreshToken({ username: user.username, role: user.role });

  res.json({ message: "Login successful", accessToken, refreshToken });
});

// ---- Refresh token endpoint ----
app.post("/refresh", (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "Refresh token missing" });
  if (!refreshTokens.includes(token)) return res.status(403).json({ message: "Invalid refresh token" });

  jwt.verify(token, REFRESH_TOKEN_SECRET, (err: any, payload: any) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    // payload contains username and role
    const newAccess = generateAccessToken({ username: payload.username, role: payload.role });
    res.json({ accessToken: newAccess });
  });
});

// ---- Logout: delete refresh token ----
app.post("/logout", (req: Request, res: Response) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token);
  res.json({ message: "Logged out (refresh token invalidated)" });
});

// ----------------- ADMIN ROUTES (RBAC protected) -----------------

// List users (no passwords shown)
app.get("/admin/users", authenticateToken, authorizeRoles(["admin"]), (req: Request, res: Response) => {
  const safe = users.map(u => ({ username: u.username, role: u.role }));
  res.json({ users: safe });
});

// Admin creates a user with a role (admin only)
app.post("/admin/create-user", authenticateToken, authorizeRoles(["admin"]), async (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ message: "username, password and role required" });
  if (!["admin", "editor", "user"].includes(role)) return res.status(400).json({ message: "Invalid role" });
  if (users.find(u => u.username === username)) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed, role });
  res.json({ message: "User created", user: { username, role } });
});

// Admin updates user (change role or reset password)
app.put("/admin/users/:username", authenticateToken, authorizeRoles(["admin"]), async (req: Request, res: Response) => {
  const target = req.params.username;
  const { role, password } = req.body;
  const user = users.find(u => u.username === target);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (role) {
    if (!["admin", "editor", "user"].includes(role)) return res.status(400).json({ message: "Invalid role" });
    user.role = role;
  }
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  res.json({ message: "User updated", user: { username: user.username, role: user.role } });
});

// Admin deletes user
app.delete("/admin/users/:username", authenticateToken, authorizeRoles(["admin"]), (req: Request, res: Response) => {
  const target = req.params.username;
  users = users.filter(u => u.username !== target);
  res.json({ message: "User deleted (if existed)", username: target });
});

// ----------------- ITEMS resource (example) -----------------
// Anyone with token can read items (users), but only admin/editor can create/update/delete

// Read items (any authenticated user)
app.get("/items", authenticateToken, (req: Request, res: Response) => {
  res.json({ items });
});

// Create item (admin or editor)
app.post("/items", authenticateToken, authorizeRoles(["admin", "editor"]), (req: Request, res: Response) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: "title & content required" });
  const newItem: Item = { id: nextItemId++, title, content };
  items.push(newItem);
  res.json({ message: "Item created", item: newItem });
});

// Update item (admin or editor)
app.put("/items/:id", authenticateToken, authorizeRoles(["admin", "editor"]), (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  const { title, content } = req.body;
  if (title) item.title = title;
  if (content) item.content = content;
  res.json({ message: "Item updated", item });
});

// Delete item (admin only)
app.delete("/items/:id", authenticateToken, authorizeRoles(["admin"]), (req: Request, res: Response) => {
  const id = Number(req.params.id);
  items = items.filter(i => i.id !== id);
  res.json({ message: "Item deleted (if existed)", id });
});

// ----------------- Utilities for testing -----------------
// Reset fake DB (development helper)
app.post("/dev/reset", (req: Request, res: Response) => {
  users = [];
  refreshTokens = [];
  items = [];
  nextItemId = 1;
  // reseed admin
  (async () => {
    const hashed = await bcrypt.hash("admin", 10);
    users.push({ username: "admin", password: hashed, role: "admin" });
  })();
  res.json({ message: "dev reset done. admin admin seeded." });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
