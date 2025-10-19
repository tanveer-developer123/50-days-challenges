import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import sequelize from '../config/database'; // 👈 added this import

// 🟡 Admin: Update order status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, order });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 User: Create new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { products, totalAmount } = req.body;
    const userId = (req as any).user.id;

    // ✅ Check stock + product existence
    for (let item of products) {
      const product = await Product.findByPk(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product not found for ID ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Stock insufficient for ${product.name}` });
      }
    }

    // ✅ Create order
    const order = await Order.create({
      userId,
      products,
      totalAmount,
      status: 'pending'
    });

    // ✅ Update stock
    for (let item of products) {
      await Product.update(
        { stock: sequelize.literal(`stock - ${item.quantity}`) },
        { where: { id: item.productId } }
      );
    }

    res.json({ success: true, order });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 User: Get his own orders
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const orders = await Order.findAll({ where: { userId } });
    res.json({ success: true, orders });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
