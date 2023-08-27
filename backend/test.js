const api_helper = require('./api/api_helper');
const endpoints = require('./config').endpoints;

const testFuncs = require('./api/endpoints');

async function test(){
    const result = await testFuncs.updatePlayers();
    console.log(result);
}

// test(endpoints().players);
test();

// we can use NbaDotComPlayerID for headshots when we query players
// https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{id}.png has headshot