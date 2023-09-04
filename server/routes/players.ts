import express from 'express';
import {
    getPlayersByConference,
    getPlayersByDivision,
    getPlayersByTeam
} from '../services/players';
import { getAll, getByID, getByName } from '../services/common';
import { requestAll, requestID, requestByString } from '../types/request';
import { Player } from '../../backend/api/types/player';
export const playerRouter = express.Router();

playerRouter.get("/", (req, res) => {
    res.json({ message: "players ok"});
});

/**
 * { fields?: 'FieldNameList' }
 */
playerRouter.get('/getAll', async function(req, res, next){
    try {
        res.json(
            await getAll<Player>(
                'players',
                req.body as requestAll
            )
        );
    } catch(err) {
        console.log(`Error while creating player`, err.message);
        next(err);
    }
});

/**
 * { id: PlayerID, fields?: 'FieldNameList' }
 */
playerRouter.get('/getByPlayerID', async function(req,res,next){
    try {
        res.json(
            await getByID<Player>(
                'players',
                'PlayerID',
                req.body as requestID
            )
        );
    } catch(err){
        console.log('Error while getting player by ID');
        next(err);
    }
});

/**
 * { id: TeamID, fields?: 'FieldNameList' }
 */
playerRouter.get('/getByTeamID', async function(req,res,next){
    try {
        res.json(await getPlayersByTeam(req.body as requestID));
    } catch(err){
        console.log('Error while getting players by team ID');
        next(err);
    }
});

/**
 * { fieldValue: conferenceName, fields?: FieldNameList}
 */
playerRouter.get('/getByConference', async function(req,res,next){
    try {
        res.json(await getPlayersByConference(req.body as requestByString));
    } catch(err){
        console.log('Error while getting players by conference');
        next(err);
    }
});

/**
 * { fieldValue: divisionName, fields?: FieldNameList}
 */
playerRouter.get('/getByDivision', async function(req,res,next){
    try {
        res.json(await getPlayersByDivision(req.body as requestByString));
    } catch(err){
        console.log('Error while getting players by division');
        next(err);
    }
});

/**
 * {
 *  fieldValue: "FirstName={name} <AND/OR> LastName={name}".
 *  fields?: FieldNameList
 * }
 * specify in above format, can do both or just one
 */
playerRouter.get('/getByName', async function(req,res,next){
    try {
        res.json(
            await getByName<Player>(
                'players',
                req.body as requestByString
            )
        );
    } catch(err){
        console.log('Error while getting players by name');
        next(err);
    }
});