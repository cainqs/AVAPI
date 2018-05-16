const sql = require('mssql');
var configs = {}

const JavDBConn = new sql.ConnectionPool({
    user: 'sa',
    password: '19880118Qs123!',
    server: 'www.cainqs.com',
    database: 'JavLibraryDownload'
});

configs.sql = sql;
configs.javConn = JavDBConn;

module.exports = configs;