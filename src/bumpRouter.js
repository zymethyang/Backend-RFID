const express = require('express');
const bodyParser = require('body-parser');

const bumpRouter = express.Router();
bumpRouter.use(bodyParser.json());

const Bumps = require('./models/bumps');
const firebase = require("firebase");
var FieldValue = require("firebase-admin").firestore.FieldValue;
var moment = require('moment');



bumpRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
        var user = firebase.auth().currentUser || false;
        if (user) {
            console.log(user.uid + ' GET Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            Bumps.findOne({ uid: user.uid }).sort({ updatedAt: -1 })
                .then(bump => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(bump);
                })
                .catch(err => {
                    console.log(user.uid || 'None' + ' Fail to GET Bump Status ! ' + err);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Error');
                });
        } else {
            console.log(' Fail to GET Bump Status !');
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.json('Error');
        }
    })
    .post((req, res, next) => {
        var user = firebase.auth().currentUser || false;
        if (user) {
            console.log(user.uid + ' POST Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            Bumps.create({
                uid: user.uid,
                status: req.body,
                startedAt: moment(FieldValue.serverTimestamp()).unix(),
                updatedAt: moment(FieldValue.serverTimestamp()).unix()
            }).then(() => {

                Bumps.find({ $and: [{ uid: user.uid }, { 'status.from': { $lte: moment(FieldValue.serverTimestamp()).unix() } }, { 'status.to': { $gte: moment(FieldValue.serverTimestamp()).unix() } }, { 'status.cCalender': { $eq: true } }] }).sort({ updatedAt: -1 })
                .then(bump => {
                    var mqtt = require('mqtt');
                    var client  = mqtt.connect({
                        host:'195.181.246.243',
                        port:'1883',
                        password:'987654321',
                        username:'sammy'
                    });

                    client.on('connect', function () {
                        client.subscribe(user.uid)
                        client.publish(user.uid+'/calender',Buffer.from(JSON.stringify(bump)));
                        client.publish(user.uid+'/hand',Buffer.from(JSON.stringify(req.body)));
                    })
            })
            .catch(err => {
                console.log(user.uid || 'None' + ' Fail to GET Bump Status ! ' + err);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json('Error');
            });

                res.statusCode = 200;
                res.json(true);
            }).catch(function (error) {
                res.statusCode = 200;
                res.json(false);
                console.error("Error adding document: ", error);
            });
        } else {
            console.log(' Fail to POST Bump Status !');
            res.json(false);
            res.statusCode = 200;
        }
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /bumps');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /bumps');
    });

    bumpRouter.route('/delete/:bumpId')
        .all((req, res, next) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.header('Access-Control-Allow-Origin', '*');
          next();
        })
        .get((req, res, next) => {
          res.statusCode = 200;
          res.end('GET operation not supported on /bumps');
        })
        .post((req, res, next) => {
            res.statusCode = 200;
            res.end('POST operation not supported on /bumps/' + req.params.bumpId);
        })
        .put((req, res, next) => {
            res.statusCode = 200;
            res.end('PUT operation not supported on /bumps');
        })
        .delete((req, res, next) => {
          var user = firebase.auth().currentUser || false;
          if (user) {
              console.log(user.uid + ' DELETE Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
              Bumps.findByIdAndRemove(req.params.bumpId)
                  .then(() => {
                  res.statusCode = 200;
                  res.json(true);
              }).catch(function (error) {
                  res.statusCode = 200;
                  res.json(false);
                  console.error("Fail to DELETE Bump Status ! ", error);
              });
          } else {
              console.log(' Fail to DELETE Bump Status !');
              res.json(false);
              res.statusCode = 200;
          }
        });


bumpRouter.route('/doingTask')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
        var user = firebase.auth().currentUser || false;
        if (user) {
            console.log(user.uid + ' GET Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            Bumps.find({ $and: [{ uid: user.uid }, { 'status.from': { $lte: moment(FieldValue.serverTimestamp()).unix() } }, { 'status.to': { $gte: moment(FieldValue.serverTimestamp()).unix() } }, { 'status.cCalender': { $eq: true } }] }).sort({ updatedAt: -1 })
                .then(bump => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(bump.reverse());
                })
                .catch(err => {
                    console.log(user.uid || 'None' + ' Fail to GET Bump Status ! ' + err);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Error');
                });
        } else {
            console.log(' Fail to GET Bump Status !');
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.json('Error');
        }
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /bumps');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /bumps');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /bumps');
    });

    bumpRouter.route('/nameBump')
        .all((req, res, next) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.header('Access-Control-Allow-Origin', '*');
            next();
        })
        .get((req, res) => {
            var user = firebase.auth().currentUser || false;
            if (user) {
                console.log(user.uid + ' GET Name Bump ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
                Bumps.find({ $and: [{ uid: user.uid }, { 'status.from': { $lte: moment(FieldValue.serverTimestamp()).unix() } }, { 'status.to': { $gte: moment(FieldValue.serverTimestamp()).unix() } }, { 'status.cCalender': { $eq: true } }] }).sort({ updatedAt: -1 })
                    .then(bump => {
                        var name = new Array(0);
                        console.log(bump);
                        for(var i=0;i<bump.length;i++){
                          var key = Object.keys(bump[i].status.bump);
                          name[i] = new Array(0);
                          for(var j=0;j<key.length;j++){
                              if(bump[i].status.bump[key[j]]){
                                name[i].push(key[j]);
                              }
                          }
                        }
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(name.reverse());
                    })
                    .catch(err => {
                        console.log(user.uid || 'None' + ' Fail to GET Bump Status ! ' + err);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json('Error');
                    });
            } else {
                console.log(' Fail to GET Bump Status !');
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 403;
                res.json('Error');
            }
        })
        .post((req, res, next) => {
            res.statusCode = 403;
            res.end('POST operation not supported on /bumps');
        })
        .put((req, res, next) => {
            res.statusCode = 403;
            res.end('PUT operation not supported on /bumps');
        })
        .delete((req, res, next) => {
            res.statusCode = 403;
            res.end('DELETE operation not supported on /bumps');
        });

bumpRouter.route('/tempTask')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
        var user = firebase.auth().currentUser || false;
        if (user) {
            console.log(user.uid + ' GET Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            Bumps.findOne({ $and: [{ uid: user.uid }, { 'status.cTemp': { $eq: true } }] }).sort({ updatedAt: -1 })
                .then(bump => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(bump.reverse());
                })
                .catch(err => {
                    console.log(user.uid || 'None' + ' Fail to GET Bump Status ! ' + err);
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Error');
                });
        } else {
            console.log(' Fail to GET Bump Status !');
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 403;
            res.json('Error');
        }
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /bumps');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /bumps');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /bumps');
    });

bumpRouter.route('/humidityTask')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
        var user = firebase.auth().currentUser || false;
        if (user) {
            console.log(user.uid + ' GET Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            Bumps.findOne({ $and: [{ uid: user.uid }, { 'status.cHumidity': { $eq: true } }] }).sort({ updatedAt: -1 })
                .then(bump => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(bump.reverse());
                })
                .catch(err => {
                    console.log(user.uid || 'None' + ' Fail to GET Bump Status ! ' + err);
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Error');
                });
        } else {
            console.log(' Fail to GET Bump Status !');
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 403;
            res.json('Error');
        }
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /bumps');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /bumps');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /bumps');
    });


module.exports = bumpRouter;
