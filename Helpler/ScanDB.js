var config = require('./DBConfig')

var functions = {};

//获取AV
functions.getMatched = function(queryStr){
    return new Promise(function(res, rej){
        config.scanConn.connect().then(function(conn) {
            var req = new config.sql.Request(conn);
            req.query(queryStr)
                    .then(data => {
                        conn.close();
                        res(data.recordset);                     
                    }).catch(err => {
                        console.log(err);
                        conn.close();
                    });
        }).catch(err => {
            console.log(err);
        });
    });
}

module.exports = functions