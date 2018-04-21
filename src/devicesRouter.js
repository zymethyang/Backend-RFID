const express = require('express');
const bodyParser = require('body-parser');
const devicesRouter = express.Router();
devicesRouter.use(bodyParser.json());

const Devices = require('./models/devices');
const firebase = require("firebase");
var FieldValue = require("firebase-admin").firestore.FieldValue;
var moment = require('moment');

devicesRouter.route('/name/:name')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
        var user = firebase.auth().currentUser || false;
        if (user) {
            var name = req.params.name;
            console.log(user.uid + ' GET DEVICE Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            Devices.findOne({ $and: [{ uid: user.uid }, { 'name.name': { $eq: name } }] }).sort({ updatedAt: -1 })
                .then(device => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(device);
                })
                .catch(err => {
                    console.log(user.uid || 'None' + ' Fail to GET Bump Status ! ' + err);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Error');
                });
        } else {
            console.log(' Fail to GET DEVICE Status !');
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

devicesRouter.route('/name')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /bumps');
    })
    .post((req, res, next) => {
        var user = firebase.auth().currentUser || false;
        if (user) {
            console.log(user.uid + ' POST DEVICE Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            Devices.create({
                uid: user.uid,
                name: req.body,
                startedAt: moment(FieldValue.serverTimestamp()).unix(),
                updatedAt: moment(FieldValue.serverTimestamp()).unix()
            }).then(() => {
                res.statusCode = 200;
                res.json(true);
            }).catch(function (error) {
                res.statusCode = 200;
                res.json(false);
                console.error("Error adding document: ", error);
            });
        } else {
            console.log(' Fail to POST DEVICE Status !');
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

module.exports = devicesRouter;
