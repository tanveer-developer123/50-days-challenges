import express from "express";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = 3000;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 225, // har IP sirf 5 requests kar sakta hai
  message: "Too many requests, please try again later."
});

// ✅ Global apply kar diya (sabhi routes pe)
app.use(limiter);

app.get("/", (req, res) => {
  res.send("Home Page - You are within limit!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



// 2nd method is ma ap kisi bhi route pr lga skta hai

// import express from "express";
// import rateLimit from "express-rate-limit";

// const app = express();
// const PORT = 3000;

// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000, 
//   max: 225,
//   message: "Too many requests, please try again later."
// });

 
// app.get("/", (req, res) => {
//   res.send("Home page");
// });

// app.get("/about", limiter, (req, res) => {
//   res.send("About page with rate limiting");
// });


// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });