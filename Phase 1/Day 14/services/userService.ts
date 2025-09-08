import { User } from "../models/userModel";
import bcrypt from "bcryptjs";

// Get all users
export const getAllUsers = async () => {
  return await User.find();
};

// Create new user (with password hash)
export const createUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  return await user.save();
};
