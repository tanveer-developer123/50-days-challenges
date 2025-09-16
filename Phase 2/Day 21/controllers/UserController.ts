import { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../model/userModel";

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const addUser = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  const newUser = await createUser(name, email, message);
  res.status(201).json(newUser);
};

export const editUser = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  const updated = await updateUser(Number(req.params.id), name, email, message);

  if (!updated) return res.status(404).json({ message: "User not found" });
  res.json(updated);
};

export const removeUser = async (req: Request, res: Response) => {
  const deleted = await deleteUser(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted successfully" });
};
