var userDB = require('../Helpler/UserDB');
const util = require('util')
var queryStr = require('../Helpler/DBQueryStr');

var functions = {};

functions.registerUser = function(query)
{
    return new Promise(function(res,rej){
        var sql = util.format(queryStr.getUser, query.username, query.email)
        userDB.getUser(sql)
        .then(data =>{
            if(data.length == 0){
                userDB.saveUser(util.format(queryStr.saveUser, query.username, query.password, query.email)).then(data => {                 
                    userDB.getUser(sql).then(d =>{
                        if(d.length == 1){
                            res({code : "success", UserId : d[0].UserID, UserName : d[0].UserName})
                        }else{
                            res({code : "fail"});
                        }
                    }).catch(e =>{
                        res({code : "fail"});
                        console.log(e);
                    });
                }).catch(err => {
                    res({code : "fail"});
                    console.log(err);
                })
            }else{
                res({code : "exist"});
            }
        }).catch(err =>{
            res({code : "fail"});
            console.log(err);
        });
    });
 }

functions.getUser = function(query)
{
     return new Promise(function(res,rej){
         var sql = util.format(queryStr.getUserWithPassword, query.username, query.password)
         userDB.getUser(sql)
         .then(data =>{
             if(data.length == 1){
                res({code : "success", UserId : data[0].UserID, UserName : data[0].UserName});
             }else{
                 res({code : "fail"});
             }
         }).catch(err =>{
            res({code : "fail"});
            console.log(err);
         });
     });
}

functions.getLike = function(query)
{
     return new Promise(function(res,rej){
         var sql = util.format(queryStr.getLike, query.userid, query.avid)
         userDB.getLike(sql)
         .then(data =>{
             if(data.length >= 1){
                res({code : true});
             }else{
                res({code : false});
             }
         }).catch(err =>{
            res(false);
             console.log(err);
         });
     });
}

functions.getWant = function(query)
{
     return new Promise(function(res,rej){
         var sql = util.format(queryStr.getWant, query.userid, query.avid)
         userDB.getWant(sql)
         .then(data =>{
             if(data.length >= 1){
                res({code : true});
             }else{
                res({code : false});
             }
         }).catch(err =>{
             res(false);
             console.log(err);
         });
     });
}

functions.addLike = function(query)
{
     return new Promise(function(res,rej){
         var sql = util.format(queryStr.saveLike, query.userid, query.avid)
         userDB.addLike(sql)
         .then(data =>{
            res({code: "success"});
         }).catch(err =>{
            res({code: "fail"});
            console.log(err);
         });
     });
}

functions.addWant = function(query)
{
     return new Promise(function(res,rej){
         var sql = util.format(queryStr.saveWant, query.userid, query.avid)
         userDB.addWant(sql)
         .then(data =>{
            res({code: "success"});
         }).catch(err =>{
            res({code: "fail"});
            console.log(err);
         });
     });
}

functions.removeLike = function(query)
{
     return new Promise(function(res,rej){
         var sql = util.format(queryStr.removeLike, query.userid, query.avid)
         userDB.removeLike(sql)
         .then(data =>{
            res({code: "success"});
         }).catch(err =>{
            res({code: "fail"});
            console.log(err);
         });
     });
}

functions.removeWant = function(query)
{
     return new Promise(function(res,rej){
         var sql = util.format(queryStr.removeWant, query.userid, query.avid)
         userDB.removeWant(sql)
         .then(data =>{
            res({code: "success"});
         }).catch(err =>{
            res({code: "fail"});
            console.log(err);
         });
     });
}

module.exports = functions;