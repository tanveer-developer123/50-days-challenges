import { Router } from "express";
import users from "../data/user.json";

const router = Router();

// ✅ Get all users
router.get("/", (req, res) => {
  res.json(users);
});

// ✅ Get single user by ID
router.get("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

export default router;
