const express = require('express');
const bodyParser = require('body-parser');
const tempRouter = express.Router();
tempRouter.use(bodyParser.json());

const Temps = require('./models/temps');
const firebase = require("firebase");


tempRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /temp');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /temp');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /temp');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported on /temp');
    });


tempRouter.route('/TempByTime/:time')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        var time = parseInt(req.params.time);
        var user = firebase.auth().currentUser || false;
        if(user){
            Temps.find({ uid: user.uid }).limit(time).sort({ 'updatedAt': -1 })
            .then(result => {
                var arrData = new Array(0);
                var arrTime = new Array(0);
                result.map(res => {
                  arrData.push(res.mean);
                });
                result.map(res => {
                  arrTime.push(res.startedAt);
                });
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({"data":arrData,"time":arrTime});
            })
            .catch(err => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json("Error");
                console.log(err);
            });
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json("Error");
        }
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported');
    });

    tempRouter.route('/TempDetailTime/:time')
        .all((req, res, next) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.header('Access-Control-Allow-Origin', '*');
            next();
        })
        .get((req, res, next) => {
            var time = parseInt(req.params.time);
            var user = firebase.auth().currentUser || false;
            if(user){
                Temps.find({ uid: user.uid }).limit(time).sort({ 'updatedAt': -1 })
                .then(result => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(result);
                })
                .catch(err => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json("Error");
                    console.log(err);
                });
            }else{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json("Error");
            }
        })
        .post((req, res, next) => {
            res.statusCode = 403;
            res.end('POST operation not supported');
        })
        .put((req, res, next) => {
            res.statusCode = 403;
            res.end('PUT operation not supported');
        })
        .delete((req, res, next) => {
            res.end('DELETE operation not supported');
        });

        tempRouter.route('/Temp7Day/:gap/:day')
            .all((req, res, next) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.header('Access-Control-Allow-Origin', '*');
                next();
            })
            .get((req, res, next) => {
                var gap = parseInt(req.params.gap);
                var day = parseInt(req.params.day);
                var i;
                var data = new Array(0);
                var user = firebase.auth().currentUser || false;
                if(user){
                    Temps.find({ uid: user.uid }).limit(day).sort({ 'updatedAt': -1 })
                    .then(result => {
                        for(i=0;i< result.length;i=i+gap){
                          data.push(result[i])
                        }
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(data);
                    })
                    .catch(err => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json("Error");
                        console.log(err);
                    });
                }else{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json("Error");
                }
            })
            .post((req, res, next) => {
                res.statusCode = 403;
                res.end('POST operation not supported');
            })
            .put((req, res, next) => {
                res.statusCode = 403;
                res.end('PUT operation not supported');
            })
            .delete((req, res, next) => {
                res.end('DELETE operation not supported');
            });


module.exports = tempRouter;
