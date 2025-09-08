import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json()); // JSON body parser

// Fake Data
let users = [
  { id: 1, name: "Malik" },
  { id: 2, name: "Ali" },
];

// Request headers ko read karna
app.get("/check", (req, res) => {
  console.log(req.headers); // sari request headers terminal me print
  res.send("Check headers in console");
});

// Response me custom header bhejna
app.get("/custom", (req, res) => {
  res.set("X-Powered-By", "Malik-Server");
  res.set("Content-Type", "application/json");
  res.status(200).json({ msg: "Hello with custom headers!" });
});

// ✅ 200 OK → Read all users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// ✅ 201 Created → Add new user
app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" }); // ❌ 400 Bad Request
  }

  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// ✅ 200 OK → Read single user
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" }); // ❌ 404 Not Found
  }
  res.status(200).json(user);
});

// ✅ 204 No Content → Delete user
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" }); // ❌ 404
  }
  users.splice(index, 1);
  res.status(204).send(); // no content
});

// ❌ 401 Unauthorized Example
app.get("/private", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token required" });
  }
  res.status(200).json({ message: "Welcome to private route" });
});

// ❌ 403 Forbidden Example
app.get("/admin", (req, res) => {
  const role = req.query.role; // ?role=user
  if (role !== "admin") {
    return res.status(403).json({ error: "Forbidden - You are not admin" });
  }
  res.status(200).json({ message: "Welcome Admin!" });
});

// ❌ 500 Internal Server Error Example
app.get("/error", (req, res) => {
  try {
    throw new Error("Something broke!");
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
