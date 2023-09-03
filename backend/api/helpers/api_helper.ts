import { api_config } from "../../config";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { preProcessJson } from "./json_helper";
import { createObject, processObject } from "./object_helper";

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