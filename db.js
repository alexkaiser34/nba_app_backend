const mysql = require('mysql2/promise');
const config = require('./config');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);

    connection.connect((err) => {
        if (err){
            console.log("Error connecting to mySQL");
            return;
        }
        console.log("connectto mysql database!");
    });

    const [results, ] = await connection.execute(sql, params);
    connection.end();
    return results;
}

module.exports = {
    query
}