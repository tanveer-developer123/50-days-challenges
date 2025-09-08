// Route Parameters

import express from "express"

const app = express();
const PORT = 5000;
app.use(express.json());



app.get('/home/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        message: `You have requested the ID: ${id}`
    });
});

app.use((req, res)=>{
    res.status(404).json({
        error : 'Route not found'
    })
})

app.get('/api/:id', (req, res) => {
    res.json(
        [
            {
                name: "Welcome to home Page"
            },
            {
                name: "Mahaz",
                CNIC: "3656167867"
            },
            {
                name: "Hybrid",
                CNIC: 3916597138489
            },
            {
                name: "Ookay Get ",
                CNIC: "7123075891265"
            }
        ]
    )
});
app.use((req, res)=>{
    res.status(404).json({
        error : 'Route not found'
    })
});

const data = [
    { id: 1, name: "Umar Mirza", CNIC: "5758959959324" },
    { id: 2, name: "Zain Chaudhry", CNIC: "1618574723847" },
    { id: 3, name: "Hassan Farooq", CNIC: "2209879449151" },
    { id: 4, name: "Sara Malik", CNIC: "7698454259816" },
    { id: 5, name: "Umar Khan", CNIC: "3957064571852" },
    { id: 6, name: "Ahmed Khan", CNIC: "1631912563334" },
    { id: 7, name: "Noor Farooq", CNIC: "8920485608097" },
    { id: 8, name: "Sara Khan", CNIC: "4900822149801" },
    { id: 9, name: "Zain Iqbal", CNIC: "3567928078235" },
    { id: 10, name: "Sara Iqbal", CNIC: "5225347714816" },
    { id: 11, name: "Ahmed Shaikh", CNIC: "8162072865014" },
    { id: 12, name: "Usman Malik", CNIC: "9136157017902" },
    { id: 13, name: "Usman Iqbal", CNIC: "7536340707067" },
    { id: 14, name: "Ahmed Shaikh", CNIC: "5631754819809" },
    { id: 15, name: "Fatima Shaikh", CNIC: "8534983195113" },
    { id: 16, name: "Hassan Shaikh", CNIC: "6811678684939" },
    { id: 17, name: "Ahmed Malik", CNIC: "2718544991539" },
    { id: 18, name: "Umar Farooq", CNIC: "6392181812846" },
    { id: 19, name: "Sara Raza", CNIC: "3060426605678" },
    { id: 20, name: "Noor Siddiqui", CNIC: "3372842518746" }
];


app.get('/home', (req, res) => {
    res.json(data);
});

app.get('/home/:id', (req, res) => {
    const { id } = req.params;
    const user = data.find(user => user.id === parseInt(id));
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
})


app.listen(PORT, () => {
    console.log(`Server is Running on localhost:${PORT}`)
})