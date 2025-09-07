import express from "express";

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  console.log("Request URL:", req.url);
  next();
})

app.get("/", (req, res) => {
  res.send("This is the Home Page 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})