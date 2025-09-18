import express from 'express'

const app = express();
const PORT = 3000;

app.get('/', (req,res)=>{
    res.send('Home Page');
})

app.listen(PORT , ()=>{
    console.log(`Server is Running on localhost:${PORT}`);
})