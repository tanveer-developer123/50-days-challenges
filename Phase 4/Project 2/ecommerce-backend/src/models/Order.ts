import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Order extends Model {}
  
  Order.init({
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    userId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    products: { 
      type: DataTypes.JSON, 
      allowNull: false 
    },
    totalAmount: { 
      type: DataTypes.FLOAT, 
      allowNull: false 
    },
    status: { 
      type: DataTypes.STRING, 
      defaultValue: 'pending' 
    }
  }, { 
    sequelize, 
    modelName: 'Order' 
  });
  
  return Order;
};