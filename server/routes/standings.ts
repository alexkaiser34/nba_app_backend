import express from 'express';
import { getSeasonStanding } from '../services/standings';
import { requestSeason } from '../types/request';

export const standingsRouter = express.Router();

standingsRouter.get("/", (req, res) => {
    res.json({ message: "standings ok"});
});

/**
 * { season: number, field?: fieldList}
 */
standingsRouter.get('/season/teamStandings', async function(req, res, next){
    try {
        res.json(
            await getSeasonStanding(
                req.body as requestSeason
            )
        );
    } catch(err) {
        console.log(err.message);
        next(err);
    }
});

/**
 * { season: number, fieldValue: conference, field?: fieldList}
 */
standingsRouter.get('/season/conferenceStandings', async function(req, res, next){
    try {
        res.json(
            await getSeasonStanding(
                req.body as requestSeason,
                'Conference'
            )
        );
    } catch(err) {
        console.log(err.message);
        next(err);
    }
});

/**
 * { season: number, fieldValue: division, field?: fieldList}
 */
standingsRouter.get('/season/divisionStandings', async function(req, res, next){
    try {
        res.json(
            await getSeasonStanding(
                req.body as requestSeason,
                'Division'
            )
        );
    } catch(err) {
        console.log(err.message);
        next(err);
    }
});