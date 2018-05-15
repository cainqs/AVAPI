const javService = require('../Service/JavService');
const express = require('express');
const app = express();

app.get('/getav', function(req, res) {
    var param = {};
    param.id = req.query.id;
    param.name = req.query.name;
    param.pageSize = req.query.pagesize;
    param.pageCount = req.query.pagecount
    param.company = req.query.company;
    param.director = req.query.director;
    param.publisher = req.query.publisher;
    param.category = req.query.category;
    param.actress = req.query.actress;
    param.order = req.query.order;

    javService.getAV(param)
    .then(result =>{
        console.log(result);
        res.send(result);
    }).catch(err =>{
        console.log(err);
    })
});

var server = app.listen(8888, function() {
    console.log('Server is running..');
});