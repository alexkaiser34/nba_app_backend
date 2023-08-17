const db = require('./db');
const db_helper = require('./db_helper');



async function createPlayersTable(){
    const result = await db.query(
        `CREATE TABLE IF NOT EXISTS players(
        id INT, first_name VARCHAR(255), last_name VARCHAR(255),
        height_feet INT, height_inches INT, position VARCHAR(255),
        team INT, weight_pounds INT,
        UNIQUE(id, first_name, last_name));`
    );
}

async function updateAllPlayers(){
    const players_json = await db_helper.getUniquePlayers();

    const insertData = await db_helper.formatInsertValues(players_json);

    if (insertData !== null){
        await db.query(
            `INSERT INTO players
            ${insertData.fields}
            VALUES
            ${insertData.values}`
        );
    }
    return;
}

module.exports = {
    updateAllPlayers,
    createPlayersTable
};