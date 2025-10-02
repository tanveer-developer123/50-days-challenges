import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
const PORT = 5000;

// 🔑 Secrets (normally .env me hote hain)
const ACCESS_TOKEN_SECRET = "myAccessSecret";
const REFRESH_TOKEN_SECRET = "myRefreshSecret";

// Fake DB
interface User {
  username: string;
  password: string; // hashed
}
let users: User[] = [];
let refreshTokens: string[] = []; // store active refresh tokens

// ✅ Generate Tokens
function generateAccessToken(username: string) {
  return jwt.sign({ username }, ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
}

function generateRefreshToken(username: string) {
  const token = jwt.sign({ username }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  refreshTokens.push(token); // save refresh token
  return token;
}

app.get('/', (req,res)=>{
    res.send('Server Home')
})

// ✅ Signup
app.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // check if exists
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = { username, password: hashedPassword };
  users.push(newUser);

  const accessToken = generateAccessToken(username);
  const refreshToken = generateRefreshToken(username);

  res.json({ message: "Signup successful", accessToken, refreshToken });
});

// ✅ Login
app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

  const accessToken = generateAccessToken(username);
  const refreshToken = generateRefreshToken(username);

  res.json({ message: "Login successful", accessToken, refreshToken });
});

// ✅ Refresh Token
app.post("/refresh", (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "Refresh token missing" });
  if (!refreshTokens.includes(token)) return res.status(403).json({ message: "Invalid refresh token" });

  jwt.verify(token, REFRESH_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = generateAccessToken(user.username);
    res.json({ accessToken });
  });
});

// ✅ Logout (delete refresh token)
app.post("/logout", (req: Request, res: Response) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token);
  res.json({ message: "Logged out successfully" });
});

// ✅ Middleware to protect routes
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    (req as any).user = user;
    next();
  });
}

// ✅ Protected Route
app.get("/dashboard", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "Welcome to Dashboard!", user: (req as any).user });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});



// yar bat suno ma na sab sa pheal signup kia or is ka baad mjha 2 token mila access or refresh okay or ma na in ko save kiya apna pas or phir is k baad ma /dashboard pr gya get ki req or is ka baad headers ma authorization or bearer token here or is ka baad agr time up hoa to token khtm ab kiay kiya /refresh pr gya post ki request okay or ma na body ka andr ma na "token" "token here "  or is ka baad kiya to jawab aya access token or token likha ay ab ma kasia chck kro aga 