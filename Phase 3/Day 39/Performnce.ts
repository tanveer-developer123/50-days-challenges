import express from "express";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;
if (cluster.isPrimary) {
  console.log(`🧠 Master ${process.pid} running with ${numCPUs} workers`);
  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on("exit", (worker) => {
    console.log(`❌ Worker ${worker.process.pid} died — restarting...`);
    cluster.fork();
  });
} else {
  const app = express();

  // 🧩 Performance + Security Middlewares
  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: "10kb" }));
  app.use(morgan("tiny"));
  app.use(express.static("public", { maxAge: "1d" }));

  // ⚙️ Rate Limiter (protect from spam/refresh)
  const limiter = rateLimit({
    windowMs: 15 * 1000, // 15 seconds window
    max: 5, // max 5 requests per 15s
    message: "❌ Too many requests! Please wait a few seconds ⏳",
  });
  app.use(limiter);

  // 🩺 Health route
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      pid: process.pid,
    });
  });

  // 🚀 Main route
  app.get("/", async (req, res) => {
    const result = await Promise.all([
      Promise.resolve("✅ Fast"),
      Promise.resolve("💨 Lightweight"),
      Promise.resolve("🔒 Secure"),
      Promise.resolve("🚫 Rate Limited"),
    ]);
    res.send(`🚀 Optimized Express App Running!\n${result.join(" | ")}`);
  });

  const PORT = 5000;
  app.listen(PORT, () =>
    console.log(`⚡ Worker ${process.pid} running on http://localhost:${PORT}`)
  );
}
