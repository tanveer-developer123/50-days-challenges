import { Router } from "express";
import { getUsers, createUserController } from "../controllers/userController";

const router = Router();

// GET /api/users → sab users
router.get("/", getUsers);

// POST /api/users → naya user
router.post("/", createUserController);

export default router;
