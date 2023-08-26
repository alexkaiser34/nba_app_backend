const express = require("express");
const bodyParser = require("body-parser");
const db = require("../backend/db");
const PORT = 3001;


const app = express();
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "ok"});
});

app.post("/query", async function(req, res, next){
    try {
        res.json(await db.query(req.body.query));
    } catch (err) {
        console.log(`Error while making query`);
        next(err);
    }
});


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