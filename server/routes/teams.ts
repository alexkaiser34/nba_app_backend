import express from 'express';
import { Team } from '../../backend/api/types/team';
import { getAll, getByField, getByID, getByName } from '../services/common';
import { requestAll, requestID, requestByString } from '../types/request';

export const teamRouter = express.Router();

teamRouter.get("/", (req, res) => {
    res.json({ message: "teams ok"});
});

/**
 * { fields?: 'FieldNameList' }
 */
teamRouter.get('/getAll', async function(req, res, next){
    try {
        res.json(
            await getAll<Team>(
                'teams',
                req.body as requestAll
            )
        );
    } catch(err) {
        console.log(`Error while getting team`, err.message);
        next(err);
    }
});

/**
 * { id: TeamID, fields?: 'FieldNameList' }
 */
teamRouter.get('/getByTeamID', async function(req, res, next){
    try {
        res.json(
            await getByID<Team>(
                'teams',
                'TeamID',
                req.body as requestID
            )
        );
    } catch(err) {
        console.log(`Error while getting team`, err.message);
        next(err);
    }
});

/**
 * { fieldValue: conferenceName, fields?: FieldNameList}
 */
teamRouter.get('/getByConference', async function(req,res,next){
    try {
        res.json(
            await getByField<Team>(
                'teams',
                'Conference',
                req.body as requestByString
            )
        );
    } catch(err){
        console.log('Error while getting teams by conference');
        next(err);
    }
});

/**
 * { fieldValue: divisionName, fields?: FieldNameList}
 */
teamRouter.get('/getByDivision', async function(req,res,next){
    try {
        res.json(
            await getByField<Team>(
                'teams',
                'Division',
                req.body as requestByString
            )
        );
    } catch(err){
        console.log('Error while getting teams by division');
        next(err);
    }
});

/**
 * { fieldValue: teamName, fields?: FieldNameList}
 */
teamRouter.get('/getByName', async function(req,res,next){
    try {
        res.json(
            await getByField<Team>(
                'teams',
                'Name',
                req.body as requestByString
            )
        );
    } catch(err){
        console.log('Error while getting teams by name');
        next(err);
    }
});