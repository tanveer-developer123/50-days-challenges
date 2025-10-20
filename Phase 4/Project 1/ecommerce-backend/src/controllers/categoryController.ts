import { Request, Response } from "express";
import Category from "../models/Category";

// CREATE category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

// GET all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// UPDATE category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const { name, description } = req.body;
    await category.update({ name, description });
    res.json({ message: "Category updated", category });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// DELETE category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await category.destroy();
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
