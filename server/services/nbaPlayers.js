const db = require('../../backend/db/db');
const helper = require('../helper');


async function getAllPlayerNames(){
    const rows = await db.query('SELECT first_name, last_name from players');
    const data = helper.emptyOrRows(rows);

    return data;
}

async function createPlayer(player){
    const result = await db.query(
        `INSERT INTO players
        (first_name, last_name, id)
        VALUES
        ('${player.first_name}','${player.last_name}', ${player.id})`
    );
    if (result.affectedRows){
        return "Player created successfully";
    }

    return "Error in creating player";
}

module.exports = {
    getAllPlayerNames,
    createPlayer
}