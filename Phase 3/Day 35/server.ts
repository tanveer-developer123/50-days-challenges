import express from 'express';

const app = expres();
const PORT = 3000;

app.get('/', (req,res)=>{
    res.send("home page");
})

app.listen(PORT  ,()=>{
    console.log(`Server is running on localhost:${PORT}`);
})