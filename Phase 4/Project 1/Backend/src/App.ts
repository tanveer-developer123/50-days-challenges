import express from "express";

const app = express();
const PORT = 5000;
app.use(express.json());

app.get('/', (req, res)=>{
res.send("Server Home page");
})


app.listen(PORT , ()=>{
console.log(`Server is running on localhost:${PORT`);
})
