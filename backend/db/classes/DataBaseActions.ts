import { ResultSetHeader } from "mysql2";
import { makeQuery } from "../db";
import { formatInsertValues, getUpdateString } from "../db_helper";
import { tableNames } from "../queries/tableQueries";

interface IDatabaseActions {
    save<T>(obj: T | T[], tableName: tableNames): Promise<number>;
    update<T>(obj: T, basedOnfield: string, tableName: tableNames) : Promise<number>;
    retrieveAll<T,>(tableName: tableNames): Promise<T[]>;
    retrieveAllByCondition<T,>(tableName: string, condition: string): Promise<T | T[] | undefined>;
    retrieveById<T,>(id: number, idField: string, tableName: tableNames): Promise<T | undefined>;
    delete(id: number, idField: string, tableName: tableNames): Promise<number>;
    deleteAll(tableName: tableNames): Promise<number>;
    createTable(tableParams: string): Promise<number>;
    dropTable(tableName: tableNames): Promise<number>;
};

class DatabaseActions implements IDatabaseActions {
    save<T>(obj: T | T[], tableName: tableNames): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const {fields, values} = formatInsertValues(obj);

            if (fields === null){
                reject('invalid data');
                return;
            }
            const sql = `INSERT INTO ${tableName} (${fields.toString()}) VALUES ${values}`;
            makeQuery<ResultSetHeader>(sql)
            .then((res) => {
                resolve(res.affectedRows);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    update<T>(obj: T, basedOnfield: string, tableName: tableNames) : Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const {sql, values} = getUpdateString(obj, basedOnfield, tableName);
            makeQuery<ResultSetHeader>(sql, values)
            .then((res) => {
                resolve(res.affectedRows);
            })
            .catch((err)=> {
                reject(err);
            });
        });

    }



    retrieveAll<T,>(tableName: tableNames): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            const sql = `SELECT * FROM ${tableName}`;
            makeQuery<T[]>(sql)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    retrieveAllByCondition<T,>(tableName: tableNames, condition: string): Promise<T | T[] | undefined> {
        return new Promise<T | T[] | undefined>((resolve, reject) => {
            const sql = `SELECT * FROM ${tableName} WHERE ${condition}`;
            makeQuery<T | T[] | undefined>(sql)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });

    }

    retrieveById<T,>(id: number, idField: string, tableName: tableNames): Promise<T | undefined> {
        return new Promise<T | undefined>((resolve, reject) => {
            const sql = `SELECT * FROM ${tableName} WHERE ${idField} = ${id}`;
            makeQuery<T | undefined>(sql)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    delete(id: number, idField: string, tableName:tableNames): Promise<number>{
        return new Promise<number>((resolve, reject) => {
            const sql = `DELETE FROM ${tableName} WHERE ${idField} = ${id}`;
            makeQuery<ResultSetHeader>(sql)
            .then((res) => {
                resolve(res.affectedRows);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    deleteAll(tableName: tableNames): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const sql = `DELETE FROM ${tableName}`;
            makeQuery<ResultSetHeader>(sql)
            .then((res) => {
                resolve(res.affectedRows);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    createTable(tableParams: string): Promise<number>{
        return new Promise<number>((resolve, reject) => {
            makeQuery<ResultSetHeader>(tableParams)
            .then((res) => {
                resolve(res.affectedRows);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    dropTable(tableName: tableNames): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const sql = `DROP TABLE ${tableName}`;
            makeQuery<ResultSetHeader>(sql)
            .then((res) => {
                resolve(res.affectedRows);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}

export default new DatabaseActions();