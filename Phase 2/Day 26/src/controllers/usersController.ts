import { Request, Response } from "express";
import { initDB } from "../db";

// ✅ Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const db = await initDB();  // 👈 yaha resolve karna hai
    const users = await db.all("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ Get single user
export const getUserById = async (req: Request, res: Response) => {
  try {
    const db = await initDB();
    const { id } = req.params;
    const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ Create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const db = await initDB();
    const { name, email } = req.body;
    const result = await db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    res.status(201).json({ id: result.lastID, name, email });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const db = await initDB();
    const { id } = req.params;
    const { name, email } = req.body;
    const result = await db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
    if (result.changes === 0) return res.status(404).json({ error: "User not found" });
    res.json({ id, name, email });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const db = await initDB();
    const { id } = req.params;
    const result = await db.run("DELETE FROM users WHERE id = ?", [id]);
    if (result.changes === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};
