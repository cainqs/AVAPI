const javService = require('../Service/JavService');
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

var server = app.listen(8888, function() {
    console.log('Server is running..');
});