import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { playerRouter } from './routes/players';
import { standingsRouter } from './routes/standings';
import { teamRouter } from './routes/teams';
import { scoresRouter } from './routes/scores';
import { statsRouter } from './routes/stats';
import { currentRouter } from './routes/current';

const PORT = process.env.PORT || '3000';

const app:Express = express();

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.get("/", (req:Request, res:Response) => {
    res.json({ message: "nba app server ok"});
});

app.use("/players", playerRouter);
app.use("/teams", teamRouter);
app.use("/standings", standingsRouter);
app.use("/scores", scoresRouter);
app.use("/stats", statsRouter);
app.use("/current", currentRouter);

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