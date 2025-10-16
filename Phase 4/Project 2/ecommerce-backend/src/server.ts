import app from "./app";
import sequelize from "./config/database";

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync({ force: true }); // dev environment
    console.log("Database synced ✅");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error(error);
  }
})();
