import DataBaseActions from "../../backend/db/classes/DataBaseActions";
import { tableNames } from "../../backend/db/queries/tableQueries";
import { requestAll, requestID, requestByString, requestByCondition } from "../types/request";


export async function getAll<T,>(
    tableName: tableNames,
    fieldNames?: requestAll
    ): Promise<T[]>{
        return new Promise<T[]>((resolve, reject) => {
            DataBaseActions.retrieveAll<T[]>(
                tableName,
                fieldNames?.fields
            )
            .then((res) => resolve(res as T[]))
            .catch((err) => reject(err));
        });
}


export async function getByID<T,>(
    tableName: tableNames,
    idField: keyof T,
    id: requestID
    ): Promise<T[]>{
        return new Promise<T[]>((resolve, reject) => {
            DataBaseActions.retrieveAllByCondition<T[]>(
                tableName,
                id.fields === undefined ? '*' : id.fields,
                `${idField as string}=${id.id}`
            )
            .then((res) => resolve(res as T[]))
            .catch((err) => reject(err));
        });
}

export async function getByField<T,>(
    tableName: tableNames,
    field: keyof T,
    data: requestByString
    ): Promise<T[]>{
        return new Promise<T[]>((resolve, reject) => {
            DataBaseActions.retrieveAllByCondition<T[]>(
                tableName,
                data.fields === undefined ? '*' : data.fields,
                `${field as string}='${data.fieldValue}'`
            )
            .then((res) => resolve(res as T[]))
            .catch((err) => reject(err));
        });
}

export async function getByJSONField<T,>(
    tableName: tableNames,
    field: keyof T,
    subfield: string,
    data: requestByString
    ): Promise<T[]>{
        return new Promise<T[]>((resolve, reject) => {
            DataBaseActions.retrieveAllByCondition<T[]>(
                tableName,
                data.fields === undefined ? '*' : data.fields,
                `JSON_EXTRACT(${field as string},'$.${subfield}') LIKE '%${data.fieldValue}%'`
            )
            .then((res) => resolve(res as T[]))
            .catch((err) => reject(err));
        });
}


export async function getByMultipleCondition<T,>(
    tableName: tableNames,
    data: requestByCondition
    ): Promise<T[]>{
        return new Promise<T[]>((resolve, reject) => {
            DataBaseActions.retrieveAllByCondition<T[]>(
                tableName,
                data.fields === undefined ? '*' : data.fields,
                data.conditions
            )
            .then((res) => resolve(res as T[]))
            .catch((err) => reject(err));
        });
}

/**
 * Let user specify first names and lastnames when making request
 * Allow them to specify AND/OR as well
 */
export async function getByName<T,>(
    tableName: tableNames,
    name: requestByString
    ): Promise<T[]>{
        return new Promise<T[]>((resolve, reject) => {
            DataBaseActions.retrieveAllByCondition<T[]>(
                tableName,
                name.fields === undefined ? '*' : name.fields,
                name.fieldValue
            )
            .then((res) => resolve(res as T[]))
            .catch((err) => reject(err));

        });
}