import express from "express";
const app = express();
const PORT = 3000;


// Async route
app.get("/userses", async (req, res, next) => {
  try {
    // Example: simulate DB call
    const users = await Promise.resolve(["Malik", "Ali", "Sara"]);
    res.json(users);
  } catch (err) {
    next(err); // error middleware ko bhej do
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});



// Normal route
app.get("/", (req, res) => {
    res.send("Welcome to Home Page!");
});

app.get('/about' , (req, res)=>{
    res.send("Server is About Page");
})
// Route with error
interface CustomError extends Error {
  status?: number;
}

app.get("/error", (req, res, next) => {
  const err: CustomError = new Error("Something went wrong!");
  err.status = 500;
  next(err);
});


// 404 Middleware (agar koi route match na kare)
app.use((req, res, next) => {
  res.status(404).json({ error: "Page Not Found" });
});

// Error Handling Middleware (4 params)
app.use((err, req, res, next) => {
  console.error(err.stack); // server pe log
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});