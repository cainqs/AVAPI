const config = require('./DBConfig')

var functions = {};

//获取AV
functions.getAV = function(queryStr){
    return new Promise(function(res, rej){
        config.javConn.connect().then(function(conn) {
            var req = new config.sql.Request(conn);
            req.query(queryStr)
                    .then(data => {
                        res(data.recordset);
                        conn.close();
                    }).catch(err => {
                        console.log(err);
                        conn.close();
                    });
        }).catch(err => {
            console.log(err);
        });
    });
}

//获取AV总数
functions.getTotalAVCount = function(queryStr){
    return new Promise(function(res, rej){
        config.javConn.connect()
        .then(conn => {
            var req = new config.sql.Request(conn);
            req.query(queryStr)
            .then(data => {
                res(data.recordset[0].Total);
                conn.close();
            }).catch(err => {
                console.log(err);
                conn.close();
            })
        }).catch(err => {
            console.log(err);
        })
    });
}

//获取类别
functions.getCategory = function(){
    return new Promise(function (res, rej){
        config.javConn.connect()
        .then(conn => {
            var req = new config.sql.Request(conn);
            req.query("SELECT * FROM Category")
            .then(data => {
                res(data.recordset);
                conn.close();
            }).catch(err => {
                console.log(err);
                conn.close();
            })
        }).catch(err => {
            console.log(err);
        })
    });
}

module.exports = functions;