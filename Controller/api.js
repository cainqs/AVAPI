const javService = require('../Service/JavService');
const picService = require('../Service/PicService');
const scanService = require('../Service/ScanService');
const userService = require('../Service/UserService');
const express = require('express');
const app = express();
var fs = require('fs')

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

app.get('/getmatched', function(req, res){
    scanService.getMatched(req.query)
    .then(result =>{
        var data = {};
        if(result.length > 0){
            data.ret = result[0].Location.trim() + "\\" + result[0].Name.trim();
        }else{
            data.ret = "";
        }
        res.send(data)
    }).catch(err =>{
        console.log(err);
    })
});

app.get('/video', function(req, res) {
        const path = req.query.path;
        console.log(path);
        const stat = fs.statSync(path)
        const fileSize = stat.size
        const range = req.headers.range
        if (range) {
          const parts = range.replace(/bytes=/, "").split("-")
          const start = parseInt(parts[0], 10)
          const end = parts[1] 
            ? parseInt(parts[1], 10)
            : fileSize-1
          const chunksize = (end-start)+1
          const file = fs.createReadStream(path, {start, end})
          const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
          }
          res.writeHead(206, head);
          file.pipe(res);
        } else {
          const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
          }
          res.writeHead(200, head)
          fs.createReadStream(path).pipe(res)
        }
});

app.get("/register", function(req, res){
    userService.getUser(req.query)
    .then(result =>{
        console.log(result);
        res.send(result);
    }).catch(err =>{
        console.log(err);
    })
});

app.get("/login", function(req, res){

});

var server = app.listen(8888, function() {
    console.log('Server is running..');
});