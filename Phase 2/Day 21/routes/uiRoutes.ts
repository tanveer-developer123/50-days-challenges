import { Router } from "express";
import {
  showUsers,
  showAddForm,
  handleAddUser,
  showEditForm,
  handleEditUser,
  handleDeleteUser,
} from "../controllers/uiController";

const router = Router();

router.get("/users", showUsers);
router.get("/users/add", showAddForm);
router.post("/users/add", handleAddUser);
router.get("/users/edit/:id", showEditForm);
router.post("/users/edit/:id", handleEditUser);
router.post("/users/delete/:id", handleDeleteUser);

export default router;
