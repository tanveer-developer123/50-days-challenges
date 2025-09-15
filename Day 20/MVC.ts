import express from 'express';

const app = express();
const PORT = 4000;

app.get('/', (req,res) =>{
    res.send('Serer is Home Pge');
})

app.listen(PORT ,()=>{
    console.log(`Server is Riunning on localhost:${PORT}`);
})