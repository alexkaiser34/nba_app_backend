import DataBaseActions from "./classes/DataBaseActions";
import _ from "lodash";
import { tableNames } from "./queries/tableQueries";

interface updateFormat{
    sql: string,
    values: any[]
}
interface insertValues{
    fields: string[],
    values: string
}
function getType(p:any): string {
    return typeof p;
}

export function getUpdateString<T>(o:T, condition:string, table: tableNames):updateFormat {
    const fields = Object.keys(o).filter(k => k !== condition).toString().replace(/,/g, ' = ?,');
    const sql: string =
    `UPDATE ${table} SET ${fields} = ? WHERE ${condition} = ${o[condition]}`;
    var values: any[] = [];
    Object.entries(o).forEach(([k,v]) => {
        if (k !== condition){
            if (getType(v) === "object"){
                values.push(JSON.stringify(v));
            }
            else {
                values.push(v);
            }
        }
    });

    return {
        sql:sql,
        values:values
    };
}

export function getMonthStr(month: number):string{
    var s:string = '';
    switch(month){
        case 1:
            s = 'JAN';
            break;
        case 2:
            s = 'FEB';
            break;
        case 3:
            s = 'MAR';
            break;
        case 4:
            s = 'APR';
            break;
        case 5:
            s = 'MAY';
            break;
        case 6:
            s = 'JUN';
            break;
        case 7:
            s = 'JUL';
            break;
        case 8:
            s = 'AUG';
            break;
        case 9:
            s = 'SEP';
            break;
        case 10:
            s = 'OCT';
            break;
        case 11:
            s = 'NOV';
            break;
        case 12:
            s = 'DEC';
            break;
        default:
            break;
    }
    return s;
}

function grabValues<T>(o:T, s: string[][]){
    const obj_key = Object.keys(o);
    let tmp:string[] = [];
    obj_key.forEach((key) => {
        if (o[key] !== null){
            if (getType(o[key]) === "object"){
                tmp.push(`'${JSON.stringify(o[key])}'`);
            }
            else if (getType(o[key]) === "string") {
                tmp.push(`'${o[key]}'`);
            }
            else {
                tmp.push(o[key]);
            }
        }
        else {
            tmp.push('null');
        }
    });
    s.push(tmp);
}

export function formatInsertValues<T>(o:T): insertValues {

    const isArr = Array.isArray(o);

    if (o === null){
        return {fields: null, values: null};
    }

    if (isArr){
        if (o.length <= 0){
            return {fields: null, values: null};
        }
    }

    const keys = isArr ? Object.keys(o[0]) : Object.keys(o);

    /** dumb hack to get past Key special keyword */
    for (const s in keys){
        if (keys[s] === 'Key'){
            keys[s] = `\`Key\``;
        }
    }

    let values:string[][] = [];
    let res:string = '';

    if (isArr){
        o.forEach((obj) => {
            grabValues(obj, values);
        });
    }
    else {
        grabValues(o, values);
    }

    values.forEach((val) => {
        res += `(${val}),`;
    });

    res = res.substring(0,res.length-1);

    return {
        fields: keys,
        values: res
    };

}

function getDatabaseDifference<T>(api:T[], db:T[] | Awaited<T>):T | T[]{
  return api.filter(a_o => {
    return IsNotInDatabase(a_o, db);
  });
}

function IsNotInDatabase<T>(api:T, db:any): boolean {
    return !db.some(db_o => {
      return _.isEqual(api, db_o);
    });
}

export async function getUniqueEntries<T>(api: T, tableName: tableNames) : Promise<T>{

    return new Promise<T>((resolve, reject) => {
        DataBaseActions.retrieveAll<T>(tableName)
        .then((db) =>{
            const isApiArr = Array.isArray(api);
            if (isApiArr){
                resolve(getDatabaseDifference(api,db));
            }
            else {
                if (IsNotInDatabase(api, db)){
                    resolve(api);
                }
                else {
                    resolve([] as T);
                }
            }
        })
        .catch((err) => {
            reject(err);
        });
    });

};