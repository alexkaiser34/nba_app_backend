const express = require('express');
const router = express.Router();
const nbaPlayers = require('../services/nbaPlayers');

// router.get('/', async function (req, res, next){
//     try {
//         res.json(await nbaPlayers.getPlayerName());
//     } catch (err) {
//         console.log(`Error while getting nba player names`);
//         next(err);
//     }
// });

router.get("/", (req, res) => {
    res.json({ message: "ok"});
});

router.post('/createPlayer', async function(req, res, next){
    try {
        res.json(await nbaPlayers.createPlayer(req.body));
    } catch(err) {
        console.log(`Error while creating player`, err.message);
        next(err);
    }
});

router.get('/getAllPlayerNames', async function(req, res, next){
    try {
        res.json(await nbaPlayers.getAllPlayerNames());
    } catch(err) {
        console.log(`Error while creating player`, err.message);
        next(err);
    }
});

module.exports = router;