import express from 'express';
import { PlayerStatGame, TeamStatGame, TeamStatSeason } from '../../backend/api/types/stats';
import { getByMultipleCondition } from '../services/common';
import { getBoxScore } from '../services/stats';
import { requestByCondition, requestID } from '../types/request';


export const statsRouter = express.Router();

statsRouter.get("/", (req, res) => {
    res.json({ message: "stats ok"});
});


statsRouter.get('/getBoxScore', async function(req,res,next){
    try {
        res.json(
            await getBoxScore(req.body as requestID)
        );
    } catch(err){
        console.log('Error while getting box score');
        next(err);
    }
});

statsRouter.get('/getPlayerGameStats', async function(req,res,next){
    try {
        res.json(
            await getByMultipleCondition<PlayerStatGame>(
                'playersGameStats',
                req.body as requestByCondition
            )
        );
    } catch(err){
        console.log('Error while getting player game stats');
        next(err);
    }
});

statsRouter.get('/getTeamGameStats', async function(req,res,next){
    try {
        res.json(
            await getByMultipleCondition<TeamStatGame>(
                'teamGameStats',
                req.body as requestByCondition
            )
        );
    } catch(err){
        console.log('Error while getting team game stats');
        next(err);
    }
});


statsRouter.get('/getTeamSeasonStats', async function(req,res,next){
    try {
        res.json(
            await getByMultipleCondition<TeamStatSeason>(
                'teamSeasonStats',
                req.body as requestByCondition
            )
        );
    } catch(err){
        console.log('Error while getting team season stats');
        next(err);
    }
});