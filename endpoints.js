const customFetch = require('./fetchAPI');
const endpoints = require('./config').endpoints;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }


async function getPlayersBySearch(search, pageOps){
    let count = 0;
    let done = false;
    let arr = [];

    const isPageOpsDef = typeof pageOps !== 'undefined'

    while (!done){
        const response = await customFetch.fetch(
            endpoints().players,
            {
                search: search,
                per_page: !isPageOpsDef ? '100' : pageOps.per_page,
                page:  !isPageOpsDef ? count.toString() : pageOps.number
            }
        );

        arr.push(response);
        if (typeof pageOps === 'undefined'){
            if (response.length != 100){
                done = true;
            }
            else {
                count += 1;
            }

            if (count % 50 == 0){
                await sleep(2 * 1000 * 60);
            }
        }
        else{
            break;
        }
    }

    /**flatten array into a bunch of entries, create json object */
    const ret = JSON.parse(JSON.stringify(arr.flat()));
    return ret;

}

async function getPlayersById(id){
    const response = await customFetch.fetch(endpoints(id).specificPlayer);
    return response;
}

async function getAllTeams(){
    const response = await customFetch.fetch(endpoints().teams, {per_page: '30', page: '1'});
    return response;
}

async function getTeamsById(id){
    const response = await customFetch.fetch(endpoints(id).specificTeam);
    return response;
}

async function getAllPlayers(){
    const allPlayers = await getPlayersBySearch();
    return allPlayers;
}

async function getAllGames(){
    let count = 0;
    let done = false;
    let arr = [];

    while (!done){
        const response = await customFetch.fetch(
            endpoints().games,
            {
                per_page: '100',
                page: count.toString()
            }
        );

        arr.push(response);
        if (typeof pageOps === 'undefined'){
            if (response.length != 100){
                done = true;
            }
            else {
                count += 1;
            }

            if (count % 50 == 0){
                await sleep(1 * 1000 * 60);
            }
        }
        else{
            break;
        }
    }

    /**flatten array into a bunch of entries, create json object */
    const ret = JSON.parse(JSON.stringify(arr.flat()));
    return ret;
}

async function getGameById(id){
    const response = await customFetch.fetch(endpoints(id).specificGame);
    return response;
}

async function getAllStats(){
    let count = 0;
    let done = false;
    let arr = [];

    while (!done){
        const response = await customFetch.fetch(
            endpoints().stats,
            {
                per_page: '100',
                page: count.toString()
            }
        );

        arr.push(response);
        if (typeof pageOps === 'undefined'){
            if (response.length != 100){
                done = true;
            }
            else {
                count += 1;
            }

            if (count % 50 == 0){
                await sleep(1 * 1000 * 60);
            }

            if (count % 500 == 0){
                await sleep(30 * 1000 * 60);
            }
        }
        else{
            break;
        }
    }

    /**flatten array into a bunch of entries, create json object */
    const ret = JSON.parse(JSON.stringify(arr.flat()));
    return ret;
}

async function stressTest(){
    await getAllPlayers();
    await sleep(30 * 1000 * 60);
    await getAllGames();
    await sleep(30 * 1000 * 60);
    await getAllStats();
}

stressTest();

module.exports = {
    getPlayersBySearch,
    getPlayersById,
    getAllTeams,
    getPlayersById,
    getAllPlayers,
    getAllGames,
    getGameById,
    getAllStats
}

