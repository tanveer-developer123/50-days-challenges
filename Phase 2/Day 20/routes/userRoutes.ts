import { Router } from "express";
import {
    getUsersController,
    getUserController,
    createUserController,
} from "../controller/userController";

const router = Router();

router.get("/", getUsersController);       // GET /users
router.get("/:id", getUserController);     // GET /users/:id
router.post("/", createUserController);    // POST /users

export default router;
