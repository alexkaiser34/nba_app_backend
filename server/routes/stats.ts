import express from 'express';
import { PlayerStatGame, TeamStatGame, TeamStatSeason } from '../../backend/api/types/stats';
import { getByMultipleCondition } from '../services/common';
import { getBoxScore } from '../services/stats';

export const statsRouter = express.Router();

statsRouter.get("/", (req, res) => {
    res.json({ message: "stats ok"});
});

statsRouter.get('/game/boxscore/:id', async function(req,res,next){
    try {
        const id = req.params.id;
        res.json(
            await getBoxScore(Number(id))
        );
    } catch(err){
        console.log('Error while getting box score');
        next(err);
    }
});

statsRouter.get('/game/playerStat/:id', async function(req,res,next){
    try {
        const id = req.params.id;
        res.json(
            await getByMultipleCondition<PlayerStatGame>(
                'playersGameStats',
                id
            )
        );
    } catch(err){
        console.log('Error while getting player game stats');
        next(err);
    }
});

statsRouter.get('/game/teamStat/:id', async function(req,res,next){
    try {
        const id = req.params.id;
        res.json(
            await getByMultipleCondition<TeamStatGame>(
                'teamGameStats',
                id
            )
        );
    } catch(err){
        console.log('Error while getting team game stats');
        next(err);
    }
});

statsRouter.get('/season/team/:id', async function(req,res,next){
    try {
        const id = req.params.id;
        res.json(
            await getByMultipleCondition<TeamStatSeason>(
                'teamSeasonStats',
                id
            )
        );
    } catch(err){
        console.log('Error while getting team season stats');
        next(err);
    }
});