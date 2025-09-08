import { Request, Response } from "express";
import products from "../data/products.json";

// Get all products
export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

// Create new product
export const createProductController = (req: Request, res: Response) => {
  const newProduct = req.body;
  products.push(newProduct); // sirf memory me add hoga
  res.status(201).json(newProduct);
};
