import Express from "express";

const app = Express();
const PORT = 5000;
app.use(Express.json());

// User Interface Define Karo
interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  [key: string]: any;
}

app.get("/search", async (req, res) => {
  const { name, email } = req.query;

  try {
    const response = await fetch("https://randomuser.me/api/?results=50");
    const data = await response.json();
    const users: User[] = data.results;

    let results: User[] = users;

    if (name) {
      results = results.filter((user: User) =>
        `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes((name as string).toLowerCase())
      );
    }

    if (email) {
      results = results.filter((user: User) =>
        user.email.toLowerCase().includes((email as string).toLowerCase())
      );
    }

    res.json({
      total: results.length,
      results,
    });
  } catch (error) {
    res.status(500).send("❌ Failed to fetch and filter users");
  }
});

app.get("/", (req, res) => {
  res.send("🌐 Welcome to Random User Search App");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
