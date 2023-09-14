import express from 'express';
import { Game } from '../../backend/api/types/game';
import { getByID, getByJSONField } from '../services/common';
import { getTeamScores } from '../services/scores';

export const scoresRouter = express.Router();

scoresRouter.get("/", (req, res) => {
    res.json({ message: "scores ok"});
});

scoresRouter.get('/day/:date', async function(req, res, next){
    try {
        const date = req.params.date;
        res.json(
            await getByJSONField<Game>(
                'games',
                'date',
                'start',
                date
            )
        );
    } catch(err) {
        console.log(`Error while creating player`, err.message);
        next(err);
    }
});

scoresRouter.get('/:id', async function(req, res, next){
    try {
        const id = req.params.id;
        res.json(
            await getByID<Game>(
                'games',
                'id',
                Number(id)
            )
        );
    } catch(err) {
        console.log(`Error while creating player`, err.message);
        next(err);
    }
});

scoresRouter.get('/team/:id', async function(req, res, next){
    try {
        const id = req.params.id;
        res.json(
            await getTeamScores(Number(id))
        );
    } catch(err) {
        console.log(`Error while creating player`, err.message);
        next(err);
    }
});
