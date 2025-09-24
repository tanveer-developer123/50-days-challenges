import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 3000;

// agr huma apna app kak access kisi ko dana ha to hum cors use krta hai hm simple apna app mma dal data ha app.use(cors()); or phir hmri pori app ka access is ka pas chla jata hai or hum is ma asa bhi kr skta ha ka app ka access sirf or sirf site ka pas jaya app.use(cors({
//   origin: "https://my-frontend.com"
// }));


// client jab custom headers bhejta hai (e.g. Authorization ya X-Custom-Header), to tum specify karte ho:
// agar frontend cookies / JWT ke sath request bhejta hai to CORS me explicitly allow karna padta hai:

app.use(cors({
    origin: 'https://protfolio-personal.vercel.app',
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],

}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home Page....');
});

// or phir hum asa bhi krskta ha ka hmri jo app hai wo isrf ya wli request jay jis ma route ka sath or parameter or route ka cnter ma agr ya likh diya to sirf whi route jaya ga
app.get('/about', cors(), (req, res) => {
    res.send("Server about page")
})


app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
})

// or phir is ma asa bhi hota ha ka ap kis request ko access dna chta hai like get , post, put, del etc.
// app.use(
//   cors({
//     origin: "https://my-frontend.com",
//     methods: ["GET", "POST"], // sirf GET aur POST allowed
//   })
// );



// 5) Dynamic origin function wala

// kab use hota hai?
// jab tum chahte ho ke origin runtime pe check ho (hardcode nahi karna).

// import cors from "cors";
// import express from "express";

// const app = express();

// const allowedOrigins = ["https://my-frontend.com", "https://admin.com"];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true); // allow
//       } else {
//         callback(new Error("Not allowed by CORS")); // block
//       }
//     },
//   })
// );
