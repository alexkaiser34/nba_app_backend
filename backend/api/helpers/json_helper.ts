import DataBaseActions from "../../db/classes/DataBaseActions";
import { templateTeamGameStats } from "../types/stats";
import { isGame, isPlayerStatGame, isStanding, isTeamSeasonStats, isTeamStatGame } from "./typeGuards";


export async function getTeamIDs():Promise<number[]>{
    return new Promise<number[]>((resolve, reject) => {
        var teamIDs: number[] = [];
        DataBaseActions.retrieveAll<any>('teams', 'TeamID')
        .then((res) => {
            res.forEach((item) => {
                teamIDs.push(item['TeamID'] as number);
            });
            resolve(teamIDs);
        })
        .catch((err) => reject(err));
    });
}

export async function getGameIDs(date: string):Promise<number[]>{
    return new Promise<number[]>((resolve, reject) => {
        var gameIDs: number[] = [];
        DataBaseActions.retrieveAllByCondition<any>(
            'games',
            'id',
            `JSON_EXTRACT(date, '$.start') LIKE '%${date}%'`
        )
        .then((res) => {
            res.forEach((item) => {
                gameIDs.push(item['id'] as number);
            });
            resolve(gameIDs);
        })
        .catch((err) => reject(err));
    });
}

function updateGameJson(j:JSON){
    for (const item in j){
        if (j[item]['league'] !== 'standard'){
            delete j[item];
        }
        else {
            const awayTeamID = j[item]['teams']['visitors']['id'];
            const homeTeamID = j[item]['teams']['home']['id'];
            j[item]['teams'] = {
                awayTeamID: awayTeamID,
                homeTeamID: homeTeamID
            };
        }
    }
}

function updateStandingsJson(j:JSON){
    for (const item in j){
        const TeamID = j[item]['team']['id'];
        j[item]['TeamID'] = TeamID;
        delete j[item]['team'];
    }
}

function updateTeamSeasonStatsJson(j:JSON, teamId: number, year: number){
    for (const item in j){
        j[item]['TeamID'] = teamId;
        j[item]['season'] = Number(year);
        const tmp = j[item]['plusMinus'];
        j[item]['plusMinus'] = tmp.toString();
    }
}

function updatePlayerStatGameJson(j:JSON){
    for (const item in j){
        const playerID = j[item]['player']['id'];
        const gameID = j[item]['game']['id'];
        const nTeamID = j[item]['team']['id'];
        j[item]['TeamID'] = nTeamID;
        j[item]['PlayerID'] = playerID;
        j[item]['GameID']  = gameID;
        delete j[item]['player'];
        delete j[item]['team'];
        delete j[item]['game'];
    }
}

function updateTeamStatGameJson(j:JSON, gameID: number){
    for (const item in j){
        const teamID = j[item]['team']['id'];

        Object.keys(templateTeamGameStats).forEach((key) => {
            j[item][key as string] = j[item]['statistics'][0][key as string];
        });

        j[item]['TeamID'] = teamID;
        j[item]['GameID']  = gameID;

        delete j[item]['statistics'];
        delete j[item]['team'];

    }
}


export function preProcessJson(o:any, j:JSON, params?: any, year?: any){
    if (isGame(o)){
        updateGameJson(j);
    }
    else if (isStanding(o)){
        updateStandingsJson(j);
    }
    else if (isTeamSeasonStats(o)){
        updateTeamSeasonStatsJson(j, params as number, year as number);
    }
    else if (isPlayerStatGame(o)){
        updatePlayerStatGameJson(j);
    }
    else if (isTeamStatGame(o)){
        updateTeamStatGameJson(j, params as number);
    }
}