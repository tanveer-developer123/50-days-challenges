import express from "express";

const app = express();
const PORT = 3000;

// Middleware for JSON & static files
app.use(express.json());
app.use(express.static("public"));

// Dummy Data
let users = [
  { id: 1, name: "Malik", age: 22 },
  { id: 2, name: "Ali", age: 25 },
];

// GET → All Users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// POST → Add User
app.post("/api/users", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT → Update User
app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { id, ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE → Remove User
app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
