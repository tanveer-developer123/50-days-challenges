import { Request, Response } from "express";
import { initDB } from "../db";

// ✅ Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const db = await initDB();
    const posts = await db.all(`
      SELECT posts.*, users.name as author
      FROM posts
      LEFT JOIN users ON posts.user_id = users.id
    `);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ Get single post by ID
export const getPostById = async (req: Request, res: Response) => {
  try {
    const db = await initDB();
    const { id } = req.params;

    const post = await db.get(
      `
      SELECT posts.*, users.name as author
      FROM posts
      LEFT JOIN users ON posts.user_id = users.id
      WHERE posts.id = ?
    `,
      [id]
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ Create new post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, user_id } = req.body;

    if (!title || !content || !user_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const db = await initDB();
    const result = await db.run(
      "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
      [title, content, user_id]
    );

    res.status(201).json({
      id: result.lastID,
      title,
      content,
      user_id,
    });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ Update post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, user_id } = req.body;

    const db = await initDB();
    const result = await db.run(
      "UPDATE posts SET title = ?, content = ?, user_id = ? WHERE id = ?",
      [title, content, user_id, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ id, title, content, user_id });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ Delete post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const db = await initDB();
    const result = await db.run("DELETE FROM posts WHERE id = ?", [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};
