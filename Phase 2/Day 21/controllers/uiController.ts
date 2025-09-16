import { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../model/uiModel";

// 🟢 Show all users
export const showUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.render("users", { users });
};

// 🟢 Show Add User form
export const showAddForm = (req: Request, res: Response) => {
  res.render("addUser");
};

// 🟢 Handle Add User
export const handleAddUser = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  await createUser(name, email, message);
  res.redirect("/users");
};

// 🟢 Show Edit User form
export const showEditForm = async (req: Request, res: Response) => {
  const user = await getUserById(Number(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.render("editUser", { user });
};

// 🟢 Handle Edit User
export const handleEditUser = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  await updateUser(Number(req.params.id), name, email, message);
  res.redirect("/users");
};

// 🟢 Handle Delete User
export const handleDeleteUser = async (req: Request, res: Response) => {
  await deleteUser(Number(req.params.id));
  res.redirect("/users");
};
