const express = require('express');
const bodyParser = require('body-parser');
const eventRouter = express.Router();
eventRouter.use(bodyParser.json());

const Events = require('./models/events');



eventRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        Events.find().sort({ 'tgkt': -1 })
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
        Events.create({
            tgbd: req.body.tgbd,
            tgkt: req.body.tgkt,
            ten: req.body.ten,
            diemCong: req.body.diemCong,
            thDu: 0,
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



module.exports = eventRouter;
