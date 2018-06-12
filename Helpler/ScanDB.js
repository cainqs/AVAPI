var config = require('./DBConfig')

var functions = {};

//获取AV
functions.getMatched = function(queryStr){
    return new Promise(function(res, rej){
        config.scanConn.connect().then(function(conn) {
            var req = new config.sql.Request(conn);
            req.query(queryStr)
                    .then(data => {
                        var d = data.recordset;
                        conn.close();
                        res(d);                     
                    }).catch(err => {
                        conn.close();
                        console.log(err);                       
                    });
        }).catch(err => {
            console.log(err);
        });
    });
}

module.exports = functions