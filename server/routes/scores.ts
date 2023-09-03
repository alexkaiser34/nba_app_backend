import express from 'express';
import { Game } from '../../backend/api/types/game';
import { requestByString, requestID } from '../types/request';
import { getByField, getByID } from '../services/common';
import { getTeamScores } from '../services/scores';

export const scoresRouter = express.Router();

scoresRouter.get("/", (req, res) => {
    res.json({ message: "scores ok"});
});

scoresRouter.get('/getByDay', async function(req, res, next){
    try {
        res.json(
            await getByField<Game>(
                'games',
                'date',
                req.body as requestByString
            )
        );
    } catch(err) {
        console.log(`Error while creating player`, err.message);
        next(err);
    }
});

scoresRouter.get('/getByGameID', async function(req, res, next){
    try {
        res.json(
            await getByID<Game>(
                'games',
                'id',
                req.body as requestID
            )
        );
    } catch(err) {
        console.log(`Error while creating player`, err.message);
        next(err);
    }
});

scoresRouter.get('/getByTeam', async function(req, res, next){
    try {
        res.json(
            await getTeamScores(req.body as requestID)
        );
    } catch(err) {
        console.log(`Error while creating player`, err.message);
        next(err);
    }
});
