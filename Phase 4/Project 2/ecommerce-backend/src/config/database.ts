import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./src/database.sqlite3",
  logging: false,
});

export default sequelize;
