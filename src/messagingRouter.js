const express = require('express');
const bodyParser = require('body-parser');
const messagingRouter = express.Router();
messagingRouter.use(bodyParser.json());

const Messagings = require('./models/messagings');
const firebase = require("firebase");
var FieldValue = require("firebase-admin").firestore.FieldValue;
var moment = require('moment');

messagingRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /messagingRouter');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /messagingRouter');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /messagingRouter');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported on /messagingRouter');
    });


messagingRouter.route('/token')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        var user = firebase.auth().currentUser || false;
        if (user) {
            Messagings.find({ uid: user.uid })
                .then(result => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(result);
                })
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json('Error');
        }
    })
    .post((req, res, next) => {
        var user = firebase.auth().currentUser || false;
        if (user) {
            Messagings.findOne({ $and: [{ uid: user.uid }, { token: req.body.token }] })
                .then(result => {
                    if (result === null) {
                        Messagings.create({
                            uid: user.uid,
                            token: [req.body.token],
                            startedAt: moment(FieldValue.serverTimestamp()).unix(),
                            updatedAt: moment(FieldValue.serverTimestamp()).unix()
                        }).then(result => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json('Successful');
                        })
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json('Successful');
                    }
                })
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json('Error');
        }
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported');
    });

module.exports = messagingRouter;
