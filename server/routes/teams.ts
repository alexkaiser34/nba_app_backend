import express from 'express';
import { Team } from '../../backend/api/types/team';
import { getAll, getByField, getByID } from '../services/common';

export const teamRouter = express.Router();

teamRouter.get('/', async function(req, res, next){
    try {
        res.json(
            await getAll<Team>(
                'teams'
            )
        );
    } catch(err) {
        console.log(`Error while getting team`, err.message);
        next(err);
    }
});

teamRouter.get('/:id', async function(req, res, next){
    try {
        const id = req.params.id;
        res.json(
            await getByID<Team>(
                'teams',
                'TeamID',
                Number(id)
            )
        );
    } catch(err) {
        console.log(`Error while getting team`, err.message);
        next(err);
    }
});

teamRouter.get('/conference/:name', async function(req,res,next){
    try {
        const name = req.params.name;
        res.json(
            await getByField<Team>(
                'teams',
                'Conference',
                name
            )
        );
    } catch(err){
        console.log('Error while getting teams by conference');
        next(err);
    }
});

teamRouter.get('/division/:name', async function(req,res,next){
    try {
        const name = req.params.name;
        res.json(
            await getByField<Team>(
                'teams',
                'Division',
                name
            )
        );
    } catch(err){
        console.log('Error while getting teams by division');
        next(err);
    }
});

teamRouter.get('/teamName/:name', async function(req,res,next){
    try {
        const name = req.params.name;
        res.json(
            await getByField<Team>(
                'teams',
                'Name',
                name
            )
        );
    } catch(err){
        console.log('Error while getting teams by name');
        next(err);
    }
});