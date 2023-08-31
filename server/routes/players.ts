import express from 'express';
import {
    getAllPlayers,
    getPlayerByID,
    getPlayersByConference,
    getPlayersByDivision,
    getPlayersByName,
    getPlayersByTeam
} from '../services/players';
import { requestAll, requestID, requestByString } from '../types/request';

export const playerRouter = express.Router();

playerRouter.get("/", (req, res) => {
    res.json({ message: "ok"});
});

playerRouter.get('/getAll', async function(req, res, next){
    try {
        res.json(await getAllPlayers(req.body as requestAll));
    } catch(err) {
        console.log(`Error while creating player`, err.message);
        next(err);
    }
});

playerRouter.get('/getByPlayerID', async function(req,res,next){
    try {
        res.json(await getPlayerByID(req.body as requestID));
    } catch(err){
        console.log('Error while getting player by ID');
        next(err);
    }
});

playerRouter.get('/getByTeamID', async function(req,res,next){
    try {
        res.json(await getPlayersByTeam(req.body as requestID));
    } catch(err){
        console.log('Error while getting players by team ID');
        next(err);
    }
});

playerRouter.get('/getByConference', async function(req,res,next){
    try {
        res.json(await getPlayersByConference(req.body as requestByString));
    } catch(err){
        console.log('Error while getting players by conference');
        next(err);
    }
});

playerRouter.get('/getByDivision', async function(req,res,next){
    try {
        res.json(await getPlayersByDivision(req.body as requestByString));
    } catch(err){
        console.log('Error while getting players by division');
        next(err);
    }
});

/**
 * FirstName={name} <AND/OR> LastName={name}
 * specify in above format, can do both or just one
 */
playerRouter.get('/getByName', async function(req,res,next){
    try {
        res.json(await getPlayersByName(req.body as requestByString));
    } catch(err){
        console.log('Error while getting players by name');
        next(err);
    }
});