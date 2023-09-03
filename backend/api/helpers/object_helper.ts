import { endpoints } from "../../config";
import { fetch } from "./api_helper";
import { getTeamIDs } from "./json_helper";
import { isPlayer, isTeam } from "./typeGuards";
import { BlankUrl, HeadshotUrl, Player } from "../types/player";
import { TeamStatSeason } from "../types/stats";
import { Team } from "../types/team";


function formatOpponentStat(arr: TeamStatSeason[]){
    for (const stat in arr){
        const keys = Object.keys(arr[stat]);
        for(const key in arr[stat]['OpponentStat']){
            if (keys.indexOf(key) < 0){
                delete arr[stat]['OpponentStat'][key];
            }
        }
    }
}

async function updatePlayer(arr: Player[], season: number | string): Promise<Player[]>{

    const teamIDs = await getTeamIDs();
    for (const id in teamIDs){
        const res_json = await fetch(endpoints().players_rapid,false,
        {
            team: teamIDs[id],
            season: season
        });

        for (const player in arr){
            if (arr[player]['NbaDotComPlayerID'] === null){
                arr[player]['Headshot'] = BlankUrl;
            }
            else {
                arr[player]['Headshot'] = HeadshotUrl(
                    arr[player]['NbaDotComPlayerID']
                );
            }

            for (const item in res_json){
                const firstNameMatch: boolean = arr[player].FirstName.toLowerCase() === res_json[item]['firstname'].toLowerCase();
                const lastNameMatch: boolean = arr[player].LastName.toLowerCase() === res_json[item]['lastname'].toLowerCase();
                if (firstNameMatch && lastNameMatch)
                {
                        arr[player].TeamID = teamIDs[id];
                        arr[player].PlayerID = res_json[item]['id'];
                }
            }
        }
    }

    /** clean up players that were not found in the rapid api
     * IDs > 1000000 mean they came from sportsData
     */
    for (const player in arr){
        if (arr[player].PlayerID > 1000000){
            delete arr[player];
        }
    }

    return new Promise<Player[]>((resolve, reject) => resolve(arr as Player[]));
}

/** replace all team IDs with the rapid API team ID */
async function updateTeam(arr: Team[]) : Promise<Team[]>{
    return new Promise<Team[]>((resolve, reject) => {
        fetch(endpoints().teams_rapid, false)
        .then((res_json) => {
            for (const item in res_json){
                if (res_json[item]['nbaFranchise']){
                    arr.forEach((team) => {
                        if (team.Name === res_json[item]['nickname']){
                            team.TeamID = res_json[item]['id'];
                        }
                    })
                }
            }
            resolve(arr);
        })
        .catch((err) => reject(err));
    });
}

export function createObject<T>(o: T, j:JSON): T[] {
    const keys = Object.keys(o);
    var res: T[] = [];

    for (const item in j){
        if (j.hasOwnProperty(item)){
            var res_temp = {} as T;
            for (const key in j[item]){
                if(keys.indexOf(key) > -1){
                    if (typeof j[item][key] === 'string'){
                        res_temp[key] = j[item][key].replace(/'/g,'');
                    }
                    else {
                        res_temp[key] = j[item][key];
                    }
                }
            }
            res.push(res_temp);
        }
    }
    return res;
}


/** Process and object after it has been created
 * Update fields and clean it up
 */
export async function processObject<T>(o_arr: T[], j:JSON, params?: any): Promise<T[]>{
    return new Promise<T[]>((resolve, reject) => {
        if (isPlayer(o_arr[0])){
            updatePlayer(o_arr as Player[], params?.season as string)
            .then((res) => resolve(res as T[]))
            .catch((err) => reject(err));
        }
        else if (isTeam(o_arr[0])){
            updateTeam(o_arr as Team[])
            .then((res) => resolve(res as T[]))
            .catch((err) => reject(err));
        }
        else {
            resolve(o_arr);
        }
    });
}