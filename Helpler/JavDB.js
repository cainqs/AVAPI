const config = require('./DBConfig')

var functions = {};

functions.getLog = function(pageSize, pageCount, callback){
    config.javConn.connect().then(function(conn) {
        var req = new config.sql.Request(conn);
        req.query(`SELECT * FROM (
                    SELECT *, ROW_NUMBER() OVER (ORDER BY JavLibraryLog) AS OnePage FROM JavLibraryLog 
                ) AS t WHERE t.OnePage between ${(pageCount - 1) * pageSize} and ${pageCount * pageSize}`)
                .then(function (recordset){
                    callback(recordset);
                    conn.close();
                }).catch(function(err){
                    console.log(err);
                    conn.close();
                });
    }).catch(err => {
        console.log(err);
    });
}

module.exports = functions;