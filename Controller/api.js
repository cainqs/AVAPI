var javDB = require('../Helpler/JavDB');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    javDB.getLog(100,1, function(result){
        res.send(result.recordset);
    });
});

var server = app.listen(8888, function () {
    console.log('Server is running..');
});