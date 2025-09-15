import express from 'express';

const app = express();
const PORT = 3000;
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Server is Home page');
})

app.get("/hello", async (req, res) => {
  console.log("👉 Pehla jawab abhi aya (server console)");
  
  // 2 second rukna
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log("👉 Dusra jawab 2 second baad aya (server console)");

  // client ko final response
  res.send("Hello! Client ko yeh ek hi response mila ✅");
});


app.get("/users", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    res.json(users); // sare 10 users return honge
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2️⃣ Get single user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    
    if (!response.ok) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await response.json();
    res.json(user); // sirf ek user return hoga
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server is Running on Localhost:${PORT}`);
})