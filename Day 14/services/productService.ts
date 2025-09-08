import { Product } from "../models/productModel";

export const getAllProducts = async () => {
  return await Product.find();
};

export const createProduct = async (name: string, price: number, description?: string) => {
  const product = new Product({ name, price, description });
  return await product.save();
};
