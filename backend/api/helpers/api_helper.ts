import { api_config } from "../../config";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getGameIDs, getTeamIDs, preProcessJson } from "./json_helper";
import { createObject, processObject } from "./object_helper";
import { isPlayerStatGame, isTeamSeasonStats } from "./typeGuards";

function hasNumber(myString) {
    return /\d/.test(myString);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export async function getArray<T>(
    o:T,
    endpoint: string,
    sportsDataApi: boolean,
    params?: any
    ):Promise<T[]>{
    return new Promise<T[]>((resolve, reject) => {
        fetch(endpoint, sportsDataApi, params)
        .then((j) => {
            preProcessJson(o, j);
            var t_arr = createObject(o, j);
            processObject(t_arr, j, params)
            .then((res) => resolve(res as T[]))
            .catch((err) => reject(err));
        })
        .catch((e:any) => {
            console.error(e);
            reject(e);
        });
    })
}

export async function getArrayMultipleRequests<T>(
    o:T,
    endpoint: string,
    sportsDataApi: boolean,
    params?: any
    ):Promise<T[]>{
        var id_arr: number[] = [];

        const byDate = params?.date !== undefined;
        if (isTeamSeasonStats(o)){
            id_arr = await getTeamIDs();
        }
        else if (isPlayerStatGame(o)){
            if (byDate){
                id_arr = await getGameIDs(params?.date);
            }
            else {
                id_arr = await getTeamIDs();
            }
        }
        else {
            id_arr = await getGameIDs(params?.date);
        }

        var json_arr: JSON[] = [];
        for (const id in id_arr){
            const ops = isTeamSeasonStats(o) ? { season: params?.season, id: id_arr[id]} :
                        isPlayerStatGame(o) && byDate  ? { game: id_arr[id]} :
                        isPlayerStatGame(o) && !byDate ? { season: params?.season, team: id_arr[id]} :
                        { id: id_arr[id] };
            const result = await fetch(endpoint, sportsDataApi, ops);
            preProcessJson(o, result, id_arr[id], params?.season);
            json_arr.push(result);
        }

        var t_arr = createObject(o, json_arr.flat());

        return new Promise<T[]>((resolve, reject) => resolve(t_arr));
}

/** sportsDataAPI = true for sportsDataApi, else will use rapidAPI */
export async function fetch(
    endpoint: string,
    sportsDataApi: boolean,
    params?: any
    ):Promise<JSON>{
    return new Promise<JSON>((resolve, reject) => {
        try {
            const options: AxiosRequestConfig = sportsDataApi ? {
                method: api_config.sportsData_api.method,
                url: api_config.sportsData_api.url + endpoint,
                headers: api_config.sportsData_api.headers
            } : {
                method: api_config.rapid_api.method,
                url: api_config.rapid_api.url + endpoint,
                headers: api_config.rapid_api.headers,
                params: params
            };
            axios.request(options)
            .then((response: AxiosResponse) => {
                if (!sportsDataApi){
                    /** need delay to avoid exceeding limit */
                    sleep(10000)
                    .then(() => {
                        const tmp = JSON.parse(JSON.stringify(response.data.response));
                        resolve(tmp);
                    })
                }
                else {
                    const tmp = JSON.parse(JSON.stringify(response.data));
                    resolve(tmp);
                }
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