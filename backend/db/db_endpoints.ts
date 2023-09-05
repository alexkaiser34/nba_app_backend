import { Game } from "../api/types/game";
import { Player } from "../api/types/player";
import { Standings } from "../api/types/standings";
import { PlayerStatGame, TeamStatGame, TeamStatSeason } from "../api/types/stats";
import { Team } from "../api/types/team";
import DataBaseActions from "./classes/DataBaseActions";


export async function db_getGameStatsByDate(date: string): Promise<PlayerStatGame[]>{
    const result = await DataBaseActions.retrieveAllByJoin<PlayerStatGame>(
        'playersGameStats',
        'playersGameStats.*',
        'games',
        'INNER',
        'games.id = playersGameStats.GameID',
        `JSON_EXTRACT(games.date, '$.start') LIKE '%${date}%'`
    );

    return new Promise<PlayerStatGame[]>((resolve, reject) => resolve(result as PlayerStatGame[]));
}

export async function db_getGameStatsPlayer(year: string): Promise<PlayerStatGame[]>{
    const yearNext = (Number(year) + 1).toString();
    const result = await DataBaseActions.retrieveAllByJoin<PlayerStatGame>(
        'playersGameStats',
        'playersGameStats.*',
        'games',
        'INNER',
        'games.id = playersGameStats.GameID',
        `JSON_EXTRACT(games.date, '$.start') LIKE '%${year}%' OR JSON_EXTRACT(games.date, '$.start') LIKE '%${yearNext}%'`
    );

    return new Promise<PlayerStatGame[]>((resolve, reject) => resolve(result as PlayerStatGame[]));
}

export async function db_getPlayers(year: string): Promise<Player[]>{
    const result = await DataBaseActions.retrieveAll<Player>(
        'players',
        '*'
    );

    return new Promise<Player[]>((resolve, reject) => resolve(result as Player[]));
}

export async function db_getTeams(): Promise<Team[]>{
    const result = await DataBaseActions.retrieveAll<Team>(
        'teams',
        '*'
    );

    return new Promise<Team[]>((resolve, reject) => resolve(result as Team[]));
}

export async function db_getSchedule(year:string): Promise<Game[]>{
    const result = await DataBaseActions.retrieveAllByCondition<Game>(
        'games',
        '*',
        `season=${year}`
    );

    return new Promise<Game[]>((resolve, reject) => resolve(result as Game[]));
}

export async function db_getStandings(year:string): Promise<Standings[]>{
    const result = await DataBaseActions.retrieveAllByCondition<Standings>(
        'standings',
        '*',
        `season=${year}`
    );

    /** mySQL returns 1 for true, 0 for false for some reason
     * Force them to be true or false here on boolean fields
     */
    for (const item in result){
        if (result[item]['winStreak'] != 0){
            result[item]['winStreak'] = true;
        }
        else {
            result[item]['winStreak'] = false;
        }
    }

    return new Promise<Standings[]>((resolve, reject) => resolve(result as Standings[]));
}


export async function db_getTeamGameStats(date:string): Promise<TeamStatGame[]>{

    const result = await DataBaseActions.retrieveAllByJoin<TeamStatGame>(
        'teamGameStats',
        'teamGameStats.*',
        'games',
        'INNER',
        'teamGameStats.GameID = games.id',
        `JSON_EXTRACT(games.date, '$.start') LIKE '%${date}%'`
    );

    return new Promise<TeamStatGame[]>((resolve, reject) => resolve(result as TeamStatGame[]));
}

export async function db_getTeamSeasonStats(year:string): Promise<TeamStatSeason[]>{

    const result = await DataBaseActions.retrieveAllByCondition<TeamStatSeason>(
        'teamSeasonStats',
        '*',
        `season=${year}`
    );

    return new Promise<TeamStatSeason[]>((resolve, reject) => resolve(result as TeamStatSeason[]));
}