import { Request, Response } from "express";

// Get all products
export const getProducts = (req: Request, res: Response) => {
  res.send("All Products from Controller");
};

// Create a product
export const createProduct = (req: Request, res: Response) => {
  res.send("Product Created from Controller");
};
