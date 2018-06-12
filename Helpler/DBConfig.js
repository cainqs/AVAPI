const sql = require('mssql');
var configs = {}

const JavDBConn = new sql.ConnectionPool({
    user: 'sa',
    password: '19880118Qs123!',
    server: 'www.cainqs.com',
    database: 'JavLibraryDownload'
});

const ScanDBConn = new sql.ConnectionPool({
    user: 'sa',
    password: '19880118Qs123!',
    server: 'www.cainqs.com',
    database: 'ScanAllAv'
});

const UserDBConn = new sql.ConnectionPool({
    user: 'sa',
    password: '19880118Qs123!',
    server: 'www.cainqs.com',
    database: 'AvManager'
});

configs.sql = sql;
configs.javConn = JavDBConn;
configs.scanConn = ScanDBConn;
configs.userConn = UserDBConn;

module.exports = configs;