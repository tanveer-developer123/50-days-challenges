import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";

const Category = sequelize.define("Category", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
});

Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

export default Category;
