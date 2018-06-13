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
        res.send(result);
    }).catch(err =>{
        console.log(err);
    })
});

app.get('/getlikeav', function(req, res) {
    javService.getLikeAv(req.query)
    .then(result =>{
        res.send(result);
    }).catch(err =>{
        console.log(err);
    })
});

app.get('/getwantav', function(req, res) {
    javService.getWantAv(req.query)
    .then(result =>{
        res.send(result);
    }).catch(err =>{
        console.log(err);
    })
});

app.get('/getCategory', function(req, res){
    javService.getCategory(req.query)
    .then(result =>{
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
    if(req.query.username == undefined || req.query.password == undefined || req.query.email == undefined){
        res.send("fail");
    }else{
        userService.registerUser(req.query)
        .then(result =>{
            res.send(result);
        }).catch(err =>{
            console.log(err);
        });
    }
});

app.get("/login", function(req, res){
    if(req.query.username == undefined || req.query.password == undefined){
        res.send({code: "fail"});
    }else{
        userService.getUser(req.query)
        .then(result =>{
            res.send(result);
        }).catch(err =>{
            console.log(err);
        });
    }
});

app.get("/addlike", function(req, res){
    userService.addLike(req.query)
    .then(result =>{
        res.send(result);
    }).catch(err =>{
        console.log(err);
    });
});

app.get("/addwant", function(req, res){
    userService.addWant(req.query)
    .then(result =>{
        res.send(result);
    }).catch(err =>{
        console.log(err);
    });
});

app.get("/getlike", function(req, res){
    userService.getLike(req.query)
    .then(result =>{
        res.send(result);
    }).catch(err =>{
        console.log(err);
    });
});

app.get("/getwant", function(req, res){
    userService.getWant(req.query)
    .then(result =>{
        res.send(result);
    }).catch(err =>{
        console.log(err);
    });
});

app.get("/removewant", function(req, res){
    userService.removeWant(req.query)
    .then(result =>{
        res.send(result);
    }).catch(err =>{
        console.log(err);
    });
});

app.get("/removelike", function(req, res){
    userService.removeLike(req.query)
    .then(result =>{
        res.send(result);
    }).catch(err =>{
        console.log(err);
    });
});

var server = app.listen(8888, function() {
    console.log('Server is running..');
});