import express from 'express';
import {
    getPlayersByConference,
    getPlayersByDivision,
    getPlayersByTeam
} from '../services/players';
import { getAll, getByID, getByName } from '../services/common';
import { ConferenceString, DivisionString } from '../types/request';
import { Player } from '../../backend/api/types/player';
export const playerRouter = express.Router();

playerRouter.get('/', async function(req, res, next){
    try {
        res.json(
            await getAll<Player>(
                'players'
            )
        );
    } catch(err) {
        console.log(`Error while getting player`, err.message);
        next(err);
    }
});

playerRouter.get('/:id', async function(req,res,next){
    try {
        const id = req.params.id;
        res.json(
            await getByID<Player>(
                'players',
                'PlayerID',
                Number(id)
            )
        );
    } catch(err){
        console.log('Error while getting player by ID');
        next(err);
    }
});

playerRouter.get('/team/:id', async function(req,res,next){
    try {
        const id = req.params.id;
        res.json(await getPlayersByTeam(Number(id)));
    } catch(err){
        console.log('Error while getting players by team ID');
        next(err);
    }
});

playerRouter.get('/conference/:name', async function(req,res,next){
    try {
        const name = req.params.name;
        res.json(await getPlayersByConference(name as ConferenceString));
    } catch(err){
        console.log('Error while getting players by conference');
        next(err);
    }
});

playerRouter.get('/division/:name', async function(req,res,next){
    try {
        const name = req.params.name;
        res.json(await getPlayersByDivision(name as DivisionString));
    } catch(err){
        console.log('Error while getting players by division');
        next(err);
    }
});

playerRouter.get('/playerName/:name', async function(req,res,next){
    try {
        const name = req.params.name;
        res.json(
            await getByName<Player>(
                'players',
                name
            )
        );
    } catch(err){
        console.log('Error while getting players by name');
        next(err);
    }
});