const endpoints = require('../config').endpoints;
const api_helper = require('./api_helper');

async function getPlayersBySearch(search, pageOps){

    const players_json = await api_helper.requestMultiplePages(
        search,
        endpoints().players,
        pageOps
    );

    /** only store team id instead of team object */
    for (player in players_json){
        players_json[player].team = players_json[player].team.id;
    }

    return players_json;
}

async function getPlayersById(id){
    const response = await api_helper.fetch(endpoints(id).specificPlayer);
    return response;
}

async function getAllTeams(){
    const response = await api_helper.fetch(
        endpoints().teams,
        {per_page: '30', page: '1'}
    );
    return response;
}

async function getTeamsById(id){
    const response = await api_helper.fetch(endpoints(id).specificTeam);
    return response;
}

async function getAllPlayers(){
    const allPlayers = await getPlayersBySearch();
    return allPlayers;
}

async function getAllGames(pageOps){

    const games_json = await api_helper.requestMultiplePages(
        null,
        endpoints().games,
        pageOps
    );

    /** only store game id instead of game object */
    for (game in games_json){
        games_json[game].visitor_team = games_json[game].visitor_team.id;
    }

    return games_json;
}

async function getGameById(id){
    const response = await api_helper.fetch(endpoints(id).specificGame);
    return response;
}

async function getAllStats(search, pageOps){

    const stats_json = await api_helper.requestMultiplePages(
        search,
        endpoints().stats,
        pageOps
    );

    return stats_json;
}

/** function to run large queries all at once */
async function stressTest(){
    await getAllPlayers();
    await getAllTeams();
    await api_helper.sleep(30 * 1000 * 60);
    await getAllGames();
    await api_helper.sleep(30 * 1000 * 60);
    await getAllStats();
}


module.exports = {
    getPlayersBySearch,
    getPlayersById,
    getAllTeams,
    getTeamsById,
    getPlayersById,
    getAllPlayers,
    getAllGames,
    getGameById,
    getAllStats
}

