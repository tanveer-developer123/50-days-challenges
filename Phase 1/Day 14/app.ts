import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { APP_CONFIG } from "./config/appConfig";
import { log } from "./config/logger";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";

// Load environment variables
dotenv.config();

// Initialize express app
const app: Application = express();

// ---------- Middlewares ----------
import errorHandler from "./middlewares/errorHandler";
import requestLogger from "./middlewares/requestLogger";

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (UI in /public)
app.use(express.static("public"));

// Custom middlewares
app.use(requestLogger);

// ---------- Routes ----------
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Welcome to My API (Express + TS + JSON Data)");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// ---------- Error Handler ----------
app.use(errorHandler);

// ---------- Start Server ----------
const startServer = async () => {
  try {
    // ❌ remove DB connect if you don’t want Mongo
    // await connectDB();

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
