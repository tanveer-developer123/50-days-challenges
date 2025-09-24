import express from 'express';

const app = express();
const PORT = 3000;
app.use(express.json);


app.get('/', (req, res)=>{
    res.send('Home Page ....');
})

app.get('/about', (req, res)=>{
    res.json('About page .....')
})

app.listen(PORT, ()=>{
    console.log(`Server is running on localhost:${PORT}`);
})