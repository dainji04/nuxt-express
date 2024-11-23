const mssql = require("mssql");

const SQL_DRIVER = "SQL Server";
const SQL_SERVER = "DAINJI";
const SQL_DATABASE = "NuxtAppHelloWorld";
const SQL_USER = "sa";
const SQL_PASSWORD = "dainji";

const configDb = {
    driver: SQL_DRIVER,
    server: SQL_SERVER,
    database: SQL_DATABASE,
    user: SQL_USER,
    password: SQL_PASSWORD,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
        max: 100,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};

const pool = new mssql.ConnectionPool(configDb);

module.exports = {
    pool,
};
