import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
const PORT = 3000;

// Database connect
const dbPromise = open({
  filename: "./Rel.sqlite3",
  driver: sqlite3.Database,
});

app.get("/users", async (req, res) => {
  const db = await dbPromise;

  // Query params (page, limit)
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;

  const offset = (page - 1) * limit;

  // Total records count
  const totalResult = await db.get("SELECT COUNT(*) as total FROM users");
  const total = totalResult.total;

  // Data fetch with pagination
  const rows = await db.all("SELECT * FROM users LIMIT ? OFFSET ?", [
    limit,
    offset,
  ]);

  res.json({
    page,
    limit,
    totalRecords: total,
    totalPages: Math.ceil(total / limit),
    data: rows,
  });
});

app.get("/userses", async (req, res) => {
  const db = await dbPromise;

  const { id, name, country ,email} = req.query;

  let query = "SELECT * FROM users WHERE 1=1";  // base query
  let params = [];

  if (id) {
    query += " AND id = ?";
    params.push(id);
  }

  if (name) {
    query += " AND name = ?";
    params.push(name);
  }
  if (email) {
    query += " AND email = ?";
    params.push(email);
  }

  if (country) {
    query += " AND country = ?";
    params.push(country);
  }

  const rows = await db.all(query, params);
  res.json(rows);
});

app.get("/users/search", async (req, res) => {
  const db = await dbPromise;
  const { q } = req.query; // search query (input se aayegi)

  if (!q) {
    return res.json({ message: "Please provide a search query ?q=" });
  }

  // Search in name OR email
  const rows = await db.all(
    "SELECT * FROM users WHERE name LIKE ? OR email LIKE ?",
    [`%${q}%`, `%${q}%`]
  );

  res.json(rows);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
