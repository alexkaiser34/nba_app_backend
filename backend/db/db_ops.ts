import {
    getPlayers,
    getSchedule,
    getStandings,
    getTeams,
    getTeamSeasonStats,
    getTeamGameStats,
    getPlayerGameStatsByTeam,
    getPlayerGameStatsByDate
} from "../api/api_endpoints";

import {
    createGamesTable,
    createPlayersGameStatsTable,
    createPlayerTable,
    createStandingsTable,
    createTeamGameStatsTable,
    createTeamSeasonStatsTable,
    createTeamTable,
    createUserTable,
    tableNames
 } from "./queries/tableQueries";

import DataBaseActions from "./classes/DataBaseActions";
import { getUniqueEntries } from "./db_helper";
import { PlayerStatGame, TeamStatGame, TeamStatSeason } from "../api/types/stats";
import { Player } from "../api/types/player";
import {
    db_getGameStatsByDate,
    db_getGameStatsPlayer,
    db_getPlayers,
    db_getSchedule,
    db_getStandings,
    db_getTeamGameStats,
    db_getTeams,
    db_getTeamSeasonStats
} from "./db_endpoints";
import { Team } from "../api/types/team";
import { Game } from "../api/types/game";
import { Standings } from "../api/types/standings";
import { isPlayerStatGame } from "../api/helpers/typeGuards";


/**
 * For now, dont return any promise data as its not entirely useful
 */
export async function updateData<T,>(api_data: T[], db_data: T[], id: keyof T, tableName: tableNames){
    const unique = await getUniqueEntries(api_data, db_data);

    let id_arr: number[] = [];
    db_data.forEach((entry) => {
        id_arr.push(entry[id as string]);
    });

    var save_arr : T[] = [];

    for (const item in unique){
        if (id_arr.includes(unique[item][id as string])){
            if (isPlayerStatGame(unique[item])){
                for (const d in db_data){
                    if ((db_data[d]['PlayerID'] === unique[item]['PlayerID']) &&
                        (db_data[d][id as string] === unique[item][id as string])){
                            await DataBaseActions.update(
                                unique[item] as T,
                                id as string,
                                tableName
                            );
                            break;
                        }
                }
            }
            else {
                await DataBaseActions.update(
                    unique[item] as T,
                    id as string,
                    tableName
                );
            }
        }
        else {
            save_arr.push(unique[item]);
        }
    }

    if (save_arr.length > 0){
        await DataBaseActions.save(save_arr, tableName);
    }
}



async function apiToDB<T,>(
    tableName:tableNames,
    api_fnc: any,
    db_func:any,
    id: keyof T,
    params?: string,
    ){
    const api_result = await api_fnc(params) as T[];
    const db_result = await db_func(params) as T[];
    console.log('updating....' + tableName);

    await updateData(api_result, db_result, id, tableName);
}

export async function dailyUpdate(){
    const currentTime = new Date();
    const year = (currentTime.getMonth() + 1) > 9 ?
            currentTime.getFullYear().toString() :
            (currentTime.getFullYear()-1).toString();

    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDate().toString();
    const date_string = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;


    /** Players */
    /** 30 request */
    await apiToDB<Player>(
        'players',
        getPlayers,
        db_getPlayers,
        'PlayerID',
        year
    );

    /** Teams */
    /** 1 request */
    await apiToDB<Team>(
        'teams',
        getTeams,
        db_getTeams,
        'TeamID'
    );

    /** Schedule */
    /** 1 request */
    await apiToDB<Game>(
        'games',
        getSchedule,
        db_getSchedule,
        'id',
        year
    );

    /** Standings */
    /** 1 request */
    await apiToDB<Standings>(
        'standings',
        getStandings,
        db_getStandings,
        'TeamID',
        year
    );

    /** Team game stats */
    /** MAX 12 requests */
    await apiToDB<TeamStatGame>(
        'teamGameStats',
        getTeamGameStats,
        db_getTeamGameStats,
        'TeamID',
        date_string
    );

    /** Team Season stats */
    /** 30 requests */
    await apiToDB<TeamStatSeason>(
        'teamSeasonStats',
        getTeamSeasonStats,
        db_getTeamSeasonStats,
        'TeamID',
        year
    );

    /** Player game stats */
    /** MAX 12 requests */
    await apiToDB<PlayerStatGame>(
        'playersGameStats',
        getPlayerGameStatsByDate,
        db_getGameStatsByDate,
        'PlayerID',
        date_string
    );

    /** Total Requests --> 87 per day out of 100 */

}

/** Handle all huge requests (seasons worth of player data) */
export async function largeRequest() {
    const currentTime = new Date();
    const year = (currentTime.getMonth() + 1) > 9 ?
            currentTime.getFullYear().toString() :
            (currentTime.getFullYear()-1).toString();


    /** player games stats for whole season
     * can return over 20k data points for completed season
     */
    await apiToDB<PlayerStatGame>(
        'playersGameStats',
        getPlayerGameStatsByTeam,
        db_getGameStatsPlayer,
        'GameID',
        year
    );

}


export async function createTables(){
    await DataBaseActions.createTable(createPlayerTable);
    await DataBaseActions.createTable(createTeamTable);
    await DataBaseActions.createTable(createStandingsTable);
    await DataBaseActions.createTable(createGamesTable);
    await DataBaseActions.createTable(createPlayersGameStatsTable);
    await DataBaseActions.createTable(createTeamSeasonStatsTable);
    await DataBaseActions.createTable(createTeamGameStatsTable);
    await DataBaseActions.createTable(createUserTable);
}

export async function deleteTables(){
    await DataBaseActions.dropTable('players');
    await DataBaseActions.dropTable('teams');
    await DataBaseActions.dropTable('standings');
    await DataBaseActions.dropTable('playersGameStats');
    await DataBaseActions.dropTable('teamGameStats');
    await DataBaseActions.dropTable('teamSeasonStats');
    await DataBaseActions.dropTable('games');
    await DataBaseActions.dropTable('users');
}