import { config } from "../config";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BlankUrl, HeadshotUrl, Player } from "./types/player";
import { TeamStatSeason } from "./types/stats";
import { BoxScore, Quarter, templateBoxScore } from "./types/game";

function hasNumber(myString) {
    return /\d/.test(myString);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isPlayer(object: any): object is Player {
    return 'Headshot' in object;
}

function isTeamSeasonStats(object: any): object is TeamStatSeason {
    return 'OpponentStat' in object;
}

function isBoxScore(object: any): object is BoxScore {
    return 'Quarters' in object;
}

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

function formatQuarters(arr: BoxScore[]){
    const o: Quarter = {
        Number: 0,
        GameID: 0,
        AwayScore: 0,
        HomeScore: 0
    };
    const keys = Object.keys(o);
    for (const stat in arr){
        for (const quarter in arr[stat]['Quarters']){
            for (const key in arr[stat]['Quarters'][quarter]){
                if(keys.indexOf(key) < 0){
                    delete  arr[stat]['Quarters'][quarter][key];
                }
            }
        }
    }
}


function createObject<T>(o: T, j:JSON): T[] {
    const keys = Object.keys(o);
    var res: T[] = [];

    for (const item in j){
        if (j.hasOwnProperty(item)){
            var res_temp = {} as T;
            for (const key in j[item]){
                if(keys.indexOf(key) > -1){
                    res_temp[key] = j[item][key];
                }
            }

            res.push(res_temp);
        }
    }
    return res;
}

function updateHeadshot(arr: Player[]){
    for (const player in arr){
        if (arr[player]['NbaDotComPlayerID'] === null){
            arr[player]['Headshot'] = BlankUrl;
        }
        else {
            arr[player]['Headshot'] = HeadshotUrl(
                arr[player]['NbaDotComPlayerID']
            );
        }
    }
}


export async function fetch(endpoint):Promise<JSON>{
    return new Promise<JSON>((resolve, reject) => {
        try {
            const options: AxiosRequestConfig = {
              method: config.method,
              url: config.url + endpoint,
              headers: config.headers
            }
            /** if endpoint contains id, response is slightly different, no meta */
            axios.request(options)
            .then((response: AxiosResponse) => {
                resolve(JSON.parse(JSON.stringify(response.data)));
            })
            .catch((err: any) => {
                console.error(err);
                reject(err);
            });
        }
        catch (e:any) {
            console.error(e);
            reject(e);
        }
    });
};

export async function getArray<T>(o:T, endpoint: string):Promise<T[]>{
    return new Promise<T[]>((resolve, reject) => {
        fetch(endpoint)
        .then((j) => {
            var t_arr = createObject(o, j);
            if (isPlayer(o)){
                updateHeadshot(t_arr as Player[]);
            }
            else if (isTeamSeasonStats(o)){
                formatOpponentStat(t_arr as TeamStatSeason[]);
            }
            else if (isBoxScore(o)){
                formatQuarters(t_arr as BoxScore[]);
            }
            resolve(t_arr);
        })
        .catch((e:any) => {
            console.error(e);
            reject(e);
        });
    })
}