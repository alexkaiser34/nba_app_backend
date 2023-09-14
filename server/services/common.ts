import DataBaseActions from "../../backend/db/classes/DataBaseActions";
import { tableNames } from "../../backend/db/queries/tableQueries";


export async function getAll<T,>(
    tableName: tableNames
    ): Promise<T[]>{
        return new Promise<T[]>((resolve, reject) => {
            DataBaseActions.retrieveAll<T[]>(
                tableName
            )
            .then((res) => resolve(res as T[]))
            .catch((err) => reject(err));
        });
}


export async function getByID<T,>(
    tableName: tableNames,
    idField: keyof T,
    id: number
    ): Promise<T[]>{
        return new Promise<T[]>((resolve, reject) => {
            DataBaseActions.retrieveAllByCondition<T[]>(
                tableName,
                '*',
                `${idField as string}=${id}`
            )
            .then((res) => resolve(res as T[]))
            .catch((err) => reject(err));
        });
}

export async function getByField<T,>(
    tableName: tableNames,
    field: keyof T,
    data: string
    ): Promise<T[]>{
        return new Promise<T[]>((resolve, reject) => {
            DataBaseActions.retrieveAllByCondition<T[]>(
                tableName,
                '*',
                `${field as string}='${data}'`
            )
            .then((res) => resolve(res as T[]))
            .catch((err) => reject(err));
        });
}

export async function getByJSONField<T,>(
    tableName: tableNames,
    field: keyof T,
    subfield: string,
    data: string
    ): Promise<T[]>{
        return new Promise<T[]>((resolve, reject) => {
            DataBaseActions.retrieveAllByCondition<T[]>(
                tableName,
                '*',
                `JSON_EXTRACT(${field as string},'$.${subfield}') LIKE '%${data}%'`
            )
            .then((res) => resolve(res as T[]))
            .catch((err) => reject(err));
        });
}


export async function getByMultipleCondition<T,>(
    tableName: tableNames,
    data: string
    ): Promise<T[]>{
        return new Promise<T[]>((resolve, reject) => {
            DataBaseActions.retrieveAllByCondition<T[]>(
                tableName,
                '*',
                data
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
    name: string
    ): Promise<T[]>{
        return new Promise<T[]>((resolve, reject) => {
            DataBaseActions.retrieveAllByCondition<T[]>(
                tableName,
                '*',
                name
            )
            .then((res) => resolve(res as T[]))
            .catch((err) => reject(err));

        });
}