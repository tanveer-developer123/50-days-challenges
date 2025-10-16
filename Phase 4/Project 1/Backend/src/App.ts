import express from "express";

const app = express();
const PORT = 5000;
app.use(express.json());

app.get('/', (req, res)=>{
res.send("Server Home page Ecommerce platform");
});

app.listen(PORT, ()=>{
    console.log(`server is running on localhost:${PORT}`)
})
