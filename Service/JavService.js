var javDB = require('../Helpler/JavDB');
const util = require('util')
var queryStr = require('../Helpler/DBQueryStr');

var functions = {};

functions.getAV = function(pageSize, pageCount, id, name, company, director, publisher, category, actress, order){
    var avStr = queryStr.AVStr;
    var avCountStr = queryStr.AVCountStr;
    var pageStr = '';
    var orderStr = ' ReleaseDate ';
    var whereStr = '';
    
    if(pageSize === undefined) pageSize = 20;
    if(pageCount === undefined) pageCount = 1;  
    pageStr += ` AND t.OnePage between ${((pageCount - 1) * pageSize) + 1} and ${pageCount * pageSize}`;
    if(id !== undefined) whereStr += ` AND ID = '${id}'`;
    if(name !== undefined) whereStr += ` AND Name like '%${name}%'`;
    if(company !==  undefined) whereStr += ` AND Company like '%${company}%'`;
    if(director !== undefined) whereStr += ` AND director like '%${director}%'`;
    if(publisher !== undefined) whereStr += ` AND publisher like '%${publisher}%'`;
    if(category !== undefined) whereStr += ` AND category like '%${category}%'`;
    if(actress !== undefined) whereStr += ` AND actress like '%${actress}%'`;
    if(order === undefined) order = 'ASC';
    orderStr += `${order}`

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
                countInfo.currentCount = pageCount;
                countInfo.totalPage = Math.floor(count / pageSize) + 1;
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

