const express = require("express");
const bodyParser = require("body-parser");
const nbaPlayersRouter = require("./routes/nbaPlayers");
const PORT = 3001;

const app = express();

app.use(bodyParser.json());

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "ok"});
});

app.use("/nbaPlayers", nbaPlayersRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});

