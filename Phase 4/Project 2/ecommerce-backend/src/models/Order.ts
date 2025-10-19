import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Order extends Model {
  public id!: number;
  public userId!: number;
  public products!: object;
  public totalAmount!: number;
  public status!: string;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    products: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
  }
);

export default Order;
