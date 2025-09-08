import { Router } from "express";
import { getProducts, createProductController } from "../controllers/productController";

const router = Router();

// GET /api/products → sab products
router.get("/", getProducts);

// POST /api/products → naya product
router.post("/", createProductController);

export default router;
