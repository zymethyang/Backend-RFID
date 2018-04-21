const express = require('express');
const bodyParser = require('body-parser');
const humidityRouter = express.Router();
humidityRouter.use(bodyParser.json());

const Humiditys = require('./models/humiditys');
const firebase = require("firebase");

humidityRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /humidity');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /humidity');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /humidity');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not support on /humidity');
    });


    humidityRouter.route('/HumidityByTime/:time')
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
                Humiditys.find({ uid: user.uid }).limit(time).sort({ 'updatedAt': -1 })
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
            res.end('POST operation not supported on');
        })
        .put((req, res, next) => {
            res.statusCode = 403;
            res.end('PUT operation not supported on');
        })
        .delete((req, res, next) => {
            res.end('DELETE operation not supported on');
        });

        humidityRouter.route('/HumidityDetailTime/:time')
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
                    Humiditys.find({ uid: user.uid }).limit(time).sort({ 'updatedAt': -1 })
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

        humidityRouter.route('/Humidity7Day/:gap/:day')
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
                    Humiditys.find({ uid: user.uid }).limit(day).sort({ 'updatedAt': -1 })
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


module.exports = humidityRouter;
