import { initDB } from "../database/db";

// User ka type
export interface User {
  id: number;
  name: string;
  email: string;
  message: string;
}

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  const db = await initDB();
  const users = await db.all<User[]>("SELECT * FROM users");
  return users;
};

// Get user by ID
export const getUserById = async (id: number): Promise<User | undefined> => {
  const db = await initDB();
  const user = await db.get<User>("SELECT * FROM users WHERE id = ?", [id]);
  return user;
};

// Insert new user
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
  return {
    id: result.lastID!,
    name,
    email,
    message,
  };
};
