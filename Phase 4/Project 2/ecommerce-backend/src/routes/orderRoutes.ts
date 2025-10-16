import express from "express";
import { createOrder, getUserOrders, updateOrderStatus } from "../controllers/orderController";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", verifyToken, createOrder); // User creates order
router.get("/my-orders", verifyToken, getUserOrders); // User sees orders
router.put("/:id", verifyToken, isAdmin, updateOrderStatus); // Admin updates status

export default router;