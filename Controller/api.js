const javService = require('../Service/JavService');
const picService = require('../Service/PicService');
const express = require('express');
const app = express();

app.get('/getav', function(req, res) {
    javService.getAV(req.query)
    .then(result =>{
        console.log(result);
        res.send(result);
    }).catch(err =>{
        console.log(err);
    })
});

app.get('/getCategory', function(req, res){
    javService.getCategory(req.query)
    .then(result =>{
        console.log(result);
        res.send(result);
    }).catch(err =>{
        console.log(err);
    })
});

app.get('/pic', function(req, res){
    res.sendFile(picService.getPic(req.query.id, req.query.name));
});

var server = app.listen(8888, function() {
    console.log('Server is running..');
});