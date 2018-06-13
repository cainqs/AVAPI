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
    
    if(param.pagesize === undefined) param.pagesize = 20;
    if(param.pagecount === undefined) param.pagecount = 1;  
    if(param.id !== undefined) whereStr += ` AND ID like '%${param.id}%'`;
    if(param.name !== undefined) whereStr += ` AND Name like '%${param.name}%'`;
    if(param.company !==  undefined) whereStr += ` AND Company like '%${param.company}%'`;
    if(param.director !== undefined) whereStr += ` AND director like '%${param.director}%'`;
    if(param.publisher !== undefined) whereStr += ` AND publisher like '%${param.publisher}%'`;
    if(param.category !== undefined) whereStr += ` AND category like '%${param.category}%'`;
    if(param.actress !== undefined) whereStr += ` AND actress like '%${param.actress}%'`;
    if(param.order === undefined) param.order = 'ASC';
    pageStr += ` AND t.OnePage between ${((param.pagecount - 1) * param.pagesize) + 1} and ${param.pagecount * param.pagesize}`;
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
                countInfo.currentCount = param.pagecount;
                countInfo.totalPage = Math.floor(count / param.pagesize) + 1;
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

functions.getLikeAv = function(param)
{
    var avStr = queryStr.getLikeAv;
    var avCountStr = queryStr.likeAVCountStr;
    var pageStr = '';
    
    pageStr += ` AND t.OnePage between ${((param.pagecount - 1) * param.pagesize) + 1} and ${param.pagecount * param.pagesize}`;

    var finalSql = util.format(avStr, param.userid, pageStr);
    var countSql = util.format(avCountStr, param.userid);
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
                countInfo.currentCount = param.pagecount;
                countInfo.totalPage = Math.floor(count / param.pagesize) + 1;
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
}

functions.getCategory = function()
{
    return new Promise(function(res,rej){
        javDB.getCategory()
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

