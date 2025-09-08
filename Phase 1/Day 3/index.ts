import express from "express";

const app = express();
const PORT = 3000;
app.use(express.json());

const users = [
    { id: 1, name: 'Tanveer', Salary: 15000 },
    { id: 2, name: 'ALI', Salary: 12000 }
];

// ✅
app.get('/users', (req, res) => {
    res.send(users);
});

// ✅
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User Not Found');
    }
    res.json(user);
});

// ✅
app.post('/users', (req, res) => {
    const newuser = {
        id: users.length + 1,
        name: req.body.name,
        Salary: req.body.Salary
    };
    users.push(newuser);
    res.status(201).json(newuser);
});

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User Not Found');
    }
    user.name = req.body.name || user.name;
    user.Salary = req.body.Salary || user.Salary;
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send("User not found");
    }
    users.splice(index, 1);
    res.send("User deleted");
});

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});
