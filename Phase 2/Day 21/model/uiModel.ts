import { initDB } from "../database/db";

export interface UIUser {
  id: number;
  name: string;
  email: string;
  message: string;
}

// 🟢 Get all users
export const getAllUsers = async (): Promise<UIUser[]> => {
  const db = await initDB();
  const users = await db.all<UIUser[]>("SELECT * FROM users");
  return users;
};

// 🟢 Get user by ID
export const getUserById = async (id: number): Promise<UIUser | undefined> => {
  const db = await initDB();
  const user = await db.get<UIUser>("SELECT * FROM users WHERE id = ?", [id]);
  return user;
};

// 🟢 Create new user
export const createUser = async (
  name: string,
  email: string,
  message: string
): Promise<UIUser> => {
  const db = await initDB();
  const result = await db.run(
    "INSERT INTO users (name, email, message) VALUES (?, ?, ?)",
    [name, email, message]
  );
  return {
    id: result.lastID!,
    name,
    email,
    message,
  };
};

// 🟢 Update user
export const updateUser = async (
  id: number,
  name: string,
  email: string,
  message: string
): Promise<void> => {
  const db = await initDB();
  await db.run(
    "UPDATE users SET name = ?, email = ?, message = ? WHERE id = ?",
    [name, email, message, id]
  );
};

// 🟢 Delete user
export const deleteUser = async (id: number): Promise<void> => {
  const db = await initDB();
  await db.run("DELETE FROM users WHERE id = ?", [id]);
};
