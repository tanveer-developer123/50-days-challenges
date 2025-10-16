import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { products, totalAmount } = req.body;
    const userId = req.user.id;
    
    // Check stock availability
    for (let item of products) {
      const product = await Product.findByPk(item.productId);
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Stock insufficient for ${product.name}` });
      }
    }
    
    // Create order
    const order = await Order.create({
      userId,
      products,
      totalAmount,
      status: 'pending'
    });
    
    // Update stock
    for (let item of products) {
      await Product.update(
        { stock: sequelize.literal(`stock - ${item.quantity}`) },
        { where: { id: item.productId } }
      );
    }
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  const orders = await Order.findAll({ where: { userId: req.user.id } });
  res.json({ success: true, orders });
};