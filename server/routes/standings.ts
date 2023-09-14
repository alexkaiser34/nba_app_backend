import express from 'express';
import { getSeasonStanding } from '../services/standings';

export const standingsRouter = express.Router();

standingsRouter.get("/", (req, res) => {
    res.json({ message: "standings ok"});
});

standingsRouter.get('/:season', async function(req, res, next){
    try {
        const season = req.params.season;
        res.json(
            await getSeasonStanding(
                Number(season)
            )
        );
    } catch(err) {
        console.log(err.message);
        next(err);
    }
});

standingsRouter.get('/:season/team/:team', async function(req, res, next){
    try {
        const season = req.params.season;
        const team = req.params.team;
        res.json(
            await getSeasonStanding(
                Number(season),
                team,
                'TeamID'
            )
        );
    } catch(err) {
        console.log(err.message);
        next(err);
    }
});

standingsRouter.get('/:season/conference/:conference', async function(req, res, next){
    try {
        const season = req.params.season;
        const conference = req.params.conference;
        res.json(
            await getSeasonStanding(
                Number(season),
                conference,
                'Conference'
            )
        );
    } catch(err) {
        console.log(err.message);
        next(err);
    }
});

standingsRouter.get('/:season/division/:division', async function(req, res, next){
    try {
        const season = req.params.season;
        const division = req.params.division;
        res.json(
            await getSeasonStanding(
                Number(season),
                division,
                'Division'
            )
        );
    } catch(err) {
        console.log(err.message);
        next(err);
    }
});