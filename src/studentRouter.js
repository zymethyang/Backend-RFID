const express = require('express');
const bodyParser = require('body-parser');
const studentRouter = express.Router();
studentRouter.use(bodyParser.json());

const Student = require('./models/student');
const Events = require('./models/events');

var mqtt = require('mqtt');


studentRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        Student.find().sort({ 'tgkt': -1 })
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            })
            .catch(err => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json([]);
            });
    })
    .post((req, res, next) => {
        Student.create({
            sktg: [],
            ten: req.body.ten,
            diem: 0,
            id: req.body.id,
        }).then(() => {
            res.statusCode = 200;
            res.json(true);
        }).catch(function (error) {
            res.statusCode = 200;
            res.json(false);
            console.log(error);
        });
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /event');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported on /event');
    });

studentRouter.route('/add/:id')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        Student.findOne({ id: req.params.id })
            .then(student => {
                var time = new Date().getTime();
                var client = mqtt.connect({
                    host: 'm13.cloudmqtt.com',
                    port: '14250',
                    password: 'B9Io8J5H88fP',
                    username: 'jepjknnb'
                })

                client.on('connect', function () {
                    console.log('Connected');
                    client.subscribe('student');
                    client.publish('student', JSON.stringify(student));
                    client.end();
                });
                Events.findOne({ $and: [{ tgbd: { $lte: Math.floor(time / 1000) } }, { tgkt: { $gte: Math.floor(time / 1000) } }] }).then(events => {
                    if (events) {
                        let tmpStudent = student;
                        tmpStudent.sktg.push(events.ten);
                        tmpStudent.diem = tmpStudent.diem + events.diemCong;
                        Student.updateOne({ id: req.params.id }, tmpStudent).then(std => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(true);

                        })
                    }
                })
            })
            .catch(err => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json([]);
            });
    })
    .post((req, res, next) => {
        Student.create({
            sktg: [],
            ten: req.body.ten,
            diem: 0,
            id: req.body.id,
        }).then(() => {
            res.statusCode = 200;
            res.json(true);
        }).catch(function (error) {
            res.statusCode = 200;
            res.json(false);
            console.log(error);
        });
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /event');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported on /event');
    });


studentRouter.route('/scan')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /event');
    })
    .post((req, res, next) => {
        console.log(req.body);
        /*
        Student.findOne({ id: req.params.id })
            .then(student => {
                var time = new Date().getTime();
                var client = mqtt.connect({
                    host: 'm13.cloudmqtt.com',
                    port: '14250',
                    password: 'B9Io8J5H88fP',
                    username: 'jepjknnb'
                })

                client.on('connect', function () {
                    console.log('Connected');
                    client.subscribe('student');
                    client.publish('student', JSON.stringify(student));
                    client.end();
                });
                Events.findOne({ $and: [{ tgbd: { $lte: Math.floor(time / 1000) } }, { tgkt: { $gte: Math.floor(time / 1000) } }] }).then(events => {
                    if (events) {
                        let tmpStudent = student;
                        tmpStudent.sktg.push(events.ten);
                        tmpStudent.diem = tmpStudent.diem + events.diemCong;
                        Student.updateOne({ id: req.params.id }, tmpStudent).then(std => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(true);

                        })
                    }
                })
            })
            .catch(err => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json([]);
            });
            */
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /event');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported on /event');
    });


module.exports = studentRouter;
