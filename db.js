require(`dotenv`).config();
const mysql = require(`mysql2/promise`);

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const mysqlOptions = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: Number(DB_PORT)
};

const DB = async (query, params) => {
    const connection = await mysql.createConnection(mysqlOptions);
    const [ rows, fields ] = await connection.query(query, params);
    connection.end();
    return await rows;
};

const singleDB = async (query, params) => {
    const connection = await mysql.createConnection(mysqlOptions);
    const [ rows, fields ] = await connection.query(query, params);
    connection.end();
    return await rows[0];
};

module.exports = { DB, singleDB, mysqlOptions };