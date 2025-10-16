import { Sequelize } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Product from './Product';
import Category from './Category';
import Order from './Order'; // ← YE ADD HUA!

// Initialize all models
User(sequelize);
Product(sequelize);
Category(sequelize);
Order(sequelize); // ← YE ADD HUA!

// Associations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Sync database
sequelize.sync();

export { User, Product, Category, Order };
export default sequelize;