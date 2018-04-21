const express = require('express');
const bodyParser = require('body-parser');
const userRouter = express.Router();
userRouter.use(bodyParser.json());

const firebase = require('./firebase-admin');
const encryptToken = require('./shared/encryptToken');
const Users = require('./models/users');

const moment = require('moment');
var FieldValue = require("firebase-admin").firestore.FieldValue;

userRouter.route('/token')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        encryptToken(req.headers.token).then(result => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        }).catch(err => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(err);
        });
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('POST operation do not support on /token');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('PUT operation not supported on /token');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('DELETE operation not supported on /token');
    });

userRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        console.log(req.headers.token);
        encryptToken(req.headers.token).then(result => {
            Users.findOne({ uid: result.uid }).then(data => {
                if (data !== null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(data);
                }
            })
        }).catch(err => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(err);
        });
    })
    .post((req, res, next) => {
        Users.create({
            uid: req.body.uid,
            email: req.body.email,
            name: req.body.name,
            avatar: req.body.avatar,
            group: 1,
            course: [],
            startedAt: moment(FieldValue.serverTimestamp()).unix(),
            updatedAt: moment(FieldValue.serverTimestamp()).unix()
        }).then(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ status: true });
        }).catch(() => {
            Users.update(
                { uid: req.body.uid },
                {
                    uid: req.body.uid,
                    email: req.body.email,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    group: 1,
                    course: [],
                    startedAt: moment(FieldValue.serverTimestamp()).unix(),
                    updatedAt: moment(FieldValue.serverTimestamp()).unix()
                }
            ).then(() => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ status: true });
            }).catch(() => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ status: false });
            })
        })
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('PUT operation not supported on /token');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('DELETE operation not supported on /token');
    });



module.exports = userRouter;
