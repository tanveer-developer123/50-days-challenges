import express from "express";
import dotenv from "dotenv";
import { APP_CONFIG } from "./config/appConfig";
import connectDB from "./config/db";
import { log } from "./config/logger";
import routes from "./routes";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form data

// Public folder for UI
app.use(express.static("public"));

// Routes
app.use("/api", routes);

// Error handling middleware (fallback)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Something went wrong" });
});

// Start server
const startServer = async () => {
  try {
    await connectDB(); // connect to MongoDB
    app.listen(APP_CONFIG.PORT, () => {
      log(`🚀 Server running in ${APP_CONFIG.NODE_ENV} mode on port ${APP_CONFIG.PORT}`);
      console.log(`👉 API available at: http://localhost:${APP_CONFIG.PORT}/api`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
