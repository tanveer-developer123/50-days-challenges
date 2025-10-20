import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Category from "./Category";

const Product = sequelize.define("Product", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  image: { type: DataTypes.STRING },
});

// Association already done in Category.ts
export default Product;
