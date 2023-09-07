import express from 'express';
import { getCurrentBoxScores } from '../services/current';


export const currentRouter = express.Router();

currentRouter.get("/", (req, res) => {
    res.json({ message: "current ok"});
});



currentRouter.get("/boxScores", async function (req, res, next){
    try {
        res.json(await getCurrentBoxScores());
    } catch(err){
        console.log('Error while getting players by division');
        next(err);
    }
});