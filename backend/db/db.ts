import mysql, { ResultSetHeader } from 'mysql2';
import { db_config } from '../config';

export async function makeQuery<T,>(sql:string, values?:any): Promise<T>{
    const connection = mysql.createConnection({
        host: db_config.host,
        user: db_config.user,
        password: db_config.password,
        database: db_config.database
    });

    return new Promise<T>((resolve, reject) => {
        connection.query<any>(sql, values, (err, res) => {
            if (err){
                console.log(err);
                connection.end();
                reject(err);
            }
            else {
                connection.end();
                resolve(res as T);
            }
        });
    });
}