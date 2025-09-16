import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
