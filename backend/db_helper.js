const endpoints = require('./endpoints');
const db = require('./db');


async function getJSONDifferenceById(api, db)
{
    var result = [];
    let match = false;
    for (player_a in api){
        match = false;
        const s_a_id = api[player_a].id;
        for (player_b in db){
            const s_b_id = db[player_b].id;
            if (s_a_id == s_b_id){
                match = true;
                break;
            }

        }
        if (!match){
            result.push(api[player_a]);
        }

    }
    return JSON.parse(JSON.stringify(result.flat()));
}

async function getUniquePlayers(){
    const players_api = await endpoints.getAllPlayers();

    var arr = [];
    for (player in players_api){
        const db_res = await db.query(
            `SELECT * from players WHERE (id = ${players_api[player].id}) OR
            (first_name = "${players_api[player].first_name}" AND
            last_name = "${players_api[player].last_name}");`
        );
        if (db_res.length <= 0){
            arr.push(players_api[player]);
        }
    }

    return JSON.parse(JSON.stringify(arr.flat()));
}

async function formatInsertValues(json){
    /** we have data */
    if (json.length > 0){
        /** get keys from first element */
        const keys = Object.keys(json[0]);
        const fields = '(' + keys.toString() + ')';

        /** create list of values to write */
        var values = '';
        for (item in json){
            values += '(';
            for (key in json[item]){
                /** use JSON stringify function to properly write null values and strings */
                if (key === keys[keys.length-1]){
                    values += `${JSON.stringify(json[item][key])}`;
                }
                else {
                    values += `${JSON.stringify(json[item][key])},`;
                }
            }
            values += '),';
        }
        /** trim off ending comma */
        values = values.substring(0,values.length-1);

        return {
            fields,
            values
        };
    }

    return null;
}

module.exports = {
    getJSONDifferenceById,
    getUniquePlayers,
    formatInsertValues
};