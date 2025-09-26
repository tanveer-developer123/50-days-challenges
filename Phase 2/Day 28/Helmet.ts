import express from "express";
import helmet from "helmet";

const app = express();
const PORT = 3000;

app.use(helmet());

app.get("/", (req, res) => {
  res.json({ message: "Hello — Helmet default is active" });
});

app.get("/plain", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send("plain text response");
});