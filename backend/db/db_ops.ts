import {
    getPlayers,
    getSchedule,
    getStandings,
    getTeams,
    getTeamSeasonStats,
    getTeamGameStats,
    getPlayerGameStatsByTeam
} from "../api/api_endpoints";

import {
    createGamesTable,
    createPlayersGameProjectionsTable,
    createPlayersGameStatsTable,
    createPlayersSeasonProjectionsTable,
    createPlayersSeasonStatsTable,
    createPlayerTable,
    createQuartersTable,
    createStandingsTable,
    createTeamGameStatsTable,
    createTeamSeasonStatsTable,
    createTeamTable,
    createUserTable,
    tableNames
 } from "./queries/tableQueries";

import DataBaseActions from "./classes/DataBaseActions";
import { getMonthStr, getUniqueEntries } from "./db_helper";


/**
 * We know the first element in each object is the ID...
 * For now, dont return any promise data as its not entirely useful
 */
export async function updateData<T,>(api_data: T, tableName: tableNames){
    const unique = await getUniqueEntries(api_data, tableName);

    const dbEntries = await DataBaseActions.retrieveAll<T>(tableName);
    let id_arr: number[] = [];
    dbEntries.forEach((entry) => {
        id_arr.push(entry[Object.keys(entry)[0]])
    });

    for (const item in unique){
        let needsUpdate = false;
        if (id_arr.includes(unique[item][Object.keys(unique[item])[0]])){
            needsUpdate = true;
        }

        if (needsUpdate){
            await DataBaseActions.update(
                unique[item] as T,
                Object.keys(unique[item])[0],
                tableName
            );
        }
        else {
            await DataBaseActions.save(unique[item], tableName);
        }
    }
}


async function apiToDB(tableName:tableNames,fnc: any, params?:string){
    const result = await fnc(params);
    console.log('updating....' + tableName);
    await updateData(result, tableName);
}

export async function dailyUpdate(){
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = getMonthStr(currentTime.getMonth() + 1);
    const day = currentTime.getDate().toString();
    const date_string = `${year}-${month}-${day}`;

    /** Players */
    await apiToDB('players', getPlayers);

    /** Teams */
    await apiToDB('teams', getTeams);

    /** Schedule */
    await apiToDB('games', getSchedule, year);

    /** Standings */
    await apiToDB('standings', getStandings, year);

    /** Team game stats */
    await apiToDB('teamGameStats', getTeamGameStats);

    /** Team Season stats */
    await apiToDB('teamSeasonStats', getTeamSeasonStats, year);

    /** Player game stats */
    await apiToDB('playersGameStats', getPlayerGameStatsByTeam, year);

}


export async function createTables(){
    await DataBaseActions.createTable(createPlayerTable);
    await DataBaseActions.createTable(createTeamTable);
    await DataBaseActions.createTable(createStandingsTable);
    await DataBaseActions.createTable(createGamesTable);
    await DataBaseActions.createTable(createQuartersTable);
    await DataBaseActions.createTable(createPlayersSeasonStatsTable);
    await DataBaseActions.createTable(createPlayersGameStatsTable);
    await DataBaseActions.createTable(createTeamSeasonStatsTable);
    await DataBaseActions.createTable(createTeamGameStatsTable);
    await DataBaseActions.createTable(createPlayersGameProjectionsTable);
    await DataBaseActions.createTable(createPlayersSeasonProjectionsTable);
    await DataBaseActions.createTable(createUserTable);
}

export async function deleteTables(){
    await DataBaseActions.dropTable('players');
    await DataBaseActions.dropTable('teams');
    await DataBaseActions.dropTable('standings');
    await DataBaseActions.dropTable('playersGameProjectionStats');
    await DataBaseActions.dropTable('quarters');
    await DataBaseActions.dropTable('playersGameStats');
    await DataBaseActions.dropTable('playersSeasonProjectionStats');
    await DataBaseActions.dropTable('playersSeasonStats');
    await DataBaseActions.dropTable('teamGameStats');
    await DataBaseActions.dropTable('teamSeasonStats');
    await DataBaseActions.dropTable('games');
    await DataBaseActions.dropTable('users');
}