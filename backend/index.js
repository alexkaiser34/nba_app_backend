const db_actions = require('./mysql_db');

function test_db_actions(){
    db_actions.createPlayersTable();
    db_actions.updateAllPlayers();
}

/** for testing */
const endpoints = require('./endpoints');

async function test(){
    const result = await endpoints.getAllGames();
    console.log(result);
    console.log(result.length);
}

test();