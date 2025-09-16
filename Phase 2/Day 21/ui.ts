import express from "express";
import bodyParser from "body-parser";
import path from "path";
import uiRoutes from "./routes/uiRoutes";

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files (public folder)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", uiRoutes);

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 UI Server running at http://localhost:${PORT}`);
});
