var config = require('./DBConfig')

var functions = {};

functions.getUser = function(queryStr){
    return new Promise(function(res, rej){
        config.userConn.connect().then(function(conn) {
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

functions.saveUser = function(queryStr){
    return new Promise(function(res, rej){
        config.userConn.connect().then(function(conn) {
            var req = new config.sql.Request(conn);
            req.query(queryStr)
                    .then(data => {
                        conn.close();
                        res("success");
                    }).catch(err => {
                        conn.close();
                        res("fail")
                        console.log(err);                       
                    });
        }).catch(err => {
            console.log(err);
        });
    });
}

functions.getLike = function(queryStr){
    return new Promise(function(res, rej){
        config.userConn.connect().then(function(conn) {
            var req = new config.sql.Request(conn);
            req.query(queryStr)
                    .then(data => {
                        res(data.recordset);
                        conn.close();                       
                    }).catch(err => {
                        conn.close();
                        console.log(err);                       
                    });
        }).catch(err => {
            console.log(err);
        });
    });
}

functions.getWant = function(queryStr){
    return new Promise(function(res, rej){
        config.userConn.connect().then(function(conn) {
            var req = new config.sql.Request(conn);
            req.query(queryStr)
                    .then(data => {
                        conn.close();
                        res(data.recordset);
                    }).catch(err => {
                        conn.close();
                        console.log(err);                       
                    });
        }).catch(err => {
            console.log(err);
        });
    });
}

functions.addLike = function(queryStr){
    return new Promise(function(res, rej){
        config.userConn.connect().then(function(conn) {
            var req = new config.sql.Request(conn);
            req.query(queryStr)
                    .then(data => {
                        conn.close();
                        res({code: "success"});
                    }).catch(err => {
                        res({code: "fail"});
                        conn.close();
                        console.log(err);                       
                    });
        }).catch(err => {
            console.log(err);
        });
    });
}

functions.addWant = function(queryStr){
    return new Promise(function(res, rej){
        config.userConn.connect().then(function(conn) {
            var req = new config.sql.Request(conn);
            req.query(queryStr)
                    .then(data => {
                        conn.close();
                        res({code: "success"});
                    }).catch(err => {
                        res({code: "fail"});
                        conn.close();
                        console.log(err);                       
                    });
        }).catch(err => {
            console.log(err);
        });
    });
}

functions.removeLike = function(queryStr){
    return new Promise(function(res, rej){
        config.userConn.connect().then(function(conn) {
            var req = new config.sql.Request(conn);
            req.query(queryStr)
                    .then(data => {
                        conn.close();
                        res("success");
                    }).catch(err => {
                        conn.close();
                        res("fail")
                        console.log(err);                       
                    });
        }).catch(err => {
            console.log(err);
        });
    });
}

functions.removeWant = function(queryStr){
    return new Promise(function(res, rej){
        config.userConn.connect().then(function(conn) {
            var req = new config.sql.Request(conn);
            req.query(queryStr)
                    .then(data => {
                        conn.close();
                        res("success");
                    }).catch(err => {
                        conn.close();
                        res("fail")
                        console.log(err);                       
                    });
        }).catch(err => {
            console.log(err);
        });
    });
}

module.exports = functions