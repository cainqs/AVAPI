var userDB = require('../Helpler/UserDB');
const util = require('util')
var queryStr = require('../Helpler/DBQueryStr');

var functions = {};

functions.getUser = function(query)
{
    return new Promise(function(res,rej){
        var sql = util.format(queryStr.getUser, query.userid)
        userDB.getUser(sql)
        .then(data =>{
            var result = {}
            result.data = data;
            res(data);
        }).catch(err =>{
            console.log(err);
        });
    });
}

module.exports = functions;