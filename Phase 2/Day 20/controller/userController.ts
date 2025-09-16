import { Request, Response } from "express";
import { getAllUsers, getUserById, createUser } from "../model/userModel";

// Get all users
export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
export const getUserController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Create new user
export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newUser = await createUser(name, email, message);
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
