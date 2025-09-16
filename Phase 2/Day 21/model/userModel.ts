import { initDB } from "../database/db";

export interface User {
  id: number;
  name: string;
  email: string;
  message: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  const db = await initDB();
  return db.all<User[]>("SELECT * FROM users");
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  const db = await initDB();
  return db.get<User>("SELECT * FROM users WHERE id = ?", [id]);
};

export const createUser = async (
  name: string,
  email: string,
  message: string
): Promise<User> => {
  const db = await initDB();
  const result = await db.run(
    "INSERT INTO users (name, email, message) VALUES (?, ?, ?)",
    [name, email, message]
  );

  return { id: result.lastID!, name, email, message };
};

export const updateUser = async (
  id: number,
  name: string,
  email: string,
  message: string
): Promise<User | null> => {
  const db = await initDB();
  const result = await db.run(
    "UPDATE users SET name = ?, email = ?, message = ? WHERE id = ?",
    [name, email, message, id]
  );

  if (result.changes === 0) return null;
  return { id, name, email, message };
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const db = await initDB();
  const result = await db.run("DELETE FROM users WHERE id = ?", [id]);
  return result.changes! > 0;
};
