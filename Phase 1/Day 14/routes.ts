// routes.ts
import { Router } from "express";

// Import individual routes
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";

const router = Router();

// Mount routes
router.use("/products", productRoutes);
router.use("/users", userRoutes);

export default router;
