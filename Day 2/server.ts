import express from "express";

const app = express();
const PORT = 3000;
// Middleware
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ name: "Tanveer", role: "Developer" });
});


app.get('/snd', (req, res) => {
    res.send("This is a Home Page");
});

app.post('/user', (req, res) => {
    const user = req.body;
    console.log("User Data ", user);
    res.send("User Created Successfully!")
});

app.put('/user/:id', (req, res) => {
    const userId = 45;
    const updatedData = 50;

    res.send(`User ${userId} updated with data: ${JSON.stringify(updatedData)}`)
})

app.delete('/user/:id', (req, res) => {
    const id = 45;

    res.send(`User ${id} has been deleted`)
});

app.listen(PORT, () => {
    console.log(`Start a Server Running on localhost:${PORT}`)
})