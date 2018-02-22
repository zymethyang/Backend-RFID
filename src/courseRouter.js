const express = require('express');
const bodyParser = require('body-parser');
const coursesRouter = express.Router();
coursesRouter.use(bodyParser.json());

const firebase = require('./firebase-admin');
const encryptToken = require('./shared/encryptToken');
const Courses = require('./models/courses');
const Users = require('./models/users');
const moment = require('moment');
var FieldValue = require("firebase-admin").firestore.FieldValue;

coursesRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('PUT operation not supported on /token');
    })
    .post((req, res, next) => {
        encryptToken(req.headers.token).then((users) => {
            var generateID = req.body.name.substring(req.body.name.length - 2) + req.body.description.substring(req.body.description.length - 2) + req.body.image.substring(req.body.image.length - 2);
            Courses.create({
                id: users.uid + generateID,
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                member: [users.uid],
                startedAt: moment(FieldValue.serverTimestamp()).unix(),
                updatedAt: moment(FieldValue.serverTimestamp()).unix()
            }).then(() => {
                Users.findOne({ uid: users.uid }).then(user => {
                    user.course.push(users.uid + generateID);
                    Users.update({ uid: users.uid }, user).then(() => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ status: true });
                    })
                        .catch(err => console.log(err));
                })
            }).catch((err) => {
                Courses.update(
                    { id: users.uid + generateID },
                    {
                        id: users.uid + generateID,
                        name: req.body.name,
                        description: req.body.description,
                        image: req.body.image,
                        member: [users.uid],
                        stream: [],
                        document: [],
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
        }).catch(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ status: false });
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

coursesRouter.route('/id')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('GET operation not supported on /id');
    })
    .post((req, res, next) => {
        var courses = req.body;
        //get info user from token, make query, get courses with query.
        encryptToken(req.headers.token).then(() => {
            let query = [];
            courses.forEach(course => {
                query.push({ id: course });
            })
            Courses.find({ $or: query }).then(courseData => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(courseData);
            })
        }).catch(err => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(err);
        });
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('PUT operation not supported on /id');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('DELETE operation not supported on /id');
    });


    coursesRouter.route('/add')
        .all((req, res, next) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            next();
        })
        .get((req, res, next) => {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.end('GET operation not supported on /id');
        })
        .post((req, res, next) => {
            var data = req.body;
            encryptToken(req.headers.token).then((users) => {
                Users.findOne({uid:users.uid}).then(data=>{
                  
                })
            })
        })
        .put((req, res, next) => {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.end('PUT operation not supported on /id');
        })
        .delete((req, res, next) => {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.end('DELETE operation not supported on /id');
        });

module.exports = coursesRouter;
