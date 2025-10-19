import sequelize from "../config/database";
import User from "./User";
import Product from "./Product";
import Category from "./Category";
import Order from "./Order";

// Associations
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

// (you can add other associations if needed)
sequelize.sync({ alter: true });

export { sequelize, User, Product, Category, Order };
