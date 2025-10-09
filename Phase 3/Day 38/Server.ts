import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = 5000;
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // max 5 requests per window
    message: "Too many requests from this IP, please try again after a minute",
});
app.use(limiter); // apply globally
const throttle = (delay: number) => {
    let lastreq = 0;

    return (req: any, res: any, next: () => void) => {
        let now = Date.now();

        if (now = - lastreq < delay) {
            const waitime = delay - (now - lastreq);
            console.log(`Delaying request for ${waitime}ms`);
            setTimeout(() => {
                lastreq = Date.now();
                next();
            }, 1000);
        } else {
            lastreq = now;
            next();
        }
    };
};
app.use(throttle(200));

app.get("/", (req, res) => {
    res.send("Hello, this is a rate limited API!");
});

app.listen(PORT, () => {
    console.log(`Server is Running on localhost:${PORT}`)
})