const mysql = require('mysql2/promise')

const db = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'electronic_shop'
}

const connection = mysql.createPool(db);

function query(sql) {
    return connection.execute(sql);
}

module.exports = {
    query
}