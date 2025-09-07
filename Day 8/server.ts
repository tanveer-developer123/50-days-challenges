import express from 'express';


const app = express();
const PORT = 3000;
    
// Topic On Res.send

app.get("/send", (req, res) => {
  res.send("<h1>Hello Malik</h1>");
});

app.get("/send2", (req, res) => {
  res.send({ name: "Malik", age: 22 });
});

// Res.JSON

app.get("/json", (req, res) => {
  res.json({ name: "Malik", skills: ["HTML", "CSS", "JS"] });
});


app.listen(PORT, ()=>{
    console.log(`Server is Running on Localhost:${PORT}`)
})