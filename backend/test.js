const api_helper = require('./api_helper');
const endpoints = require('./config').endpoints;


async function test(endpoint){
    const result = await api_helper.fetch(endpoint)
    console.log(result);
}

test(endpoints('2021').playerSeasonStats);

// we can use NbaDotComPlayerID for headshots when we query players
// https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{id}.png has headshot