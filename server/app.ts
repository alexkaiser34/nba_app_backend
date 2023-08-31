import express, { Express, Request, Response } from 'express';
import { playerRouter } from './routes/players';
const PORT = process.env.PORT || '3000';

const app:Express = express();

app.use(express.json());

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.get("/", (req:Request, res:Response) => {
    res.json({ message: "alex is cool cat"});
});

app.use("/nbaPlayers", playerRouter);

/* Error handler middleware */
app.use((err, req:Request, res:Response, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});