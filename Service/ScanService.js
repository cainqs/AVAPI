var scanDB = require('../Helpler/ScanDB');
const util = require('util')
var queryStr = require('../Helpler/DBQueryStr');

var functions = {};

functions.getMatched = function(query)
{
    return new Promise(function(res,rej){
        var sql = util.format(queryStr.matchedStr, query.avid)
        scanDB.getMatched()
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

