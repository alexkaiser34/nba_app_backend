import DataBaseActions from "../../db/classes/DataBaseActions";
import { isGame } from "./typeGuards";


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

export function preProcessJson(o:any, j:JSON){
    if (isGame(o)){
        updateGameJson(j);
    }
}