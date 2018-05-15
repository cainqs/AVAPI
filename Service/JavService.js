var javDB = require('../Helpler/JavDB');
const util = require('util')
var queryStr = require('../Helpler/DBQueryStr');

var functions = {};

functions.getAV = function(param){
    var avStr = queryStr.AVStr;
    var avCountStr = queryStr.AVCountStr;
    var pageStr = '';
    var orderStr = ' ReleaseDate ';
    var whereStr = '';
    
    if(param.pageSize === undefined) param.pageSize = 20;
    if(param.pageCount === undefined) param.pageCount = 1;  
    pageStr += ` AND t.OnePage between ${((param.pageCount - 1) * param.pageSize) + 1} and ${param.pageCount * param.pageSize}`;
    if(param.id !== undefined) whereStr += ` AND ID = '${param.id}'`;
    if(param.name !== undefined) whereStr += ` AND Name like '%${param.name}%'`;
    if(param.company !==  undefined) whereStr += ` AND Company like '%${param.company}%'`;
    if(param.director !== undefined) whereStr += ` AND director like '%${param.director}%'`;
    if(param.publisher !== undefined) whereStr += ` AND publisher like '%${param.publisher}%'`;
    if(param.category !== undefined) whereStr += ` AND category like '%${param.category}%'`;
    if(param.actress !== undefined) whereStr += ` AND actress like '%${param.actress}%'`;
    if(param.order === undefined) param.order = 'ASC';
    orderStr += `${param.order}`

    var finalSql = util.format(avStr, orderStr, whereStr, pageStr);
    var countSql = util.format(avCountStr, whereStr);
    console.log('Final SQL -> ' + finalSql);
    console.log('Count SQL -> ' + countSql);

    return new Promise(function(res,rej){
        javDB.getAV(finalSql)
        .then(data =>{
            javDB.getTotalAVCount(countSql)
            .then(count =>{
                var result = {};
                var countInfo = {};
                countInfo.totalCount = count;
                countInfo.currentCount = param.pageCount;
                countInfo.totalPage = Math.floor(count / param.pageSize) + 1;
                result.data = data;
                result.count = countInfo;
                res(result);
            }).catch(err => {
                console.log(err);
            });
        }).catch(err =>{
            console.log(err);
        });
    });
};

module.exports = functions;

