const express = require('express');
const bodyParser = require('body-parser');
const realtimeRouter = express.Router();
realtimeRouter.use(bodyParser.json());

const Realtime = require('./models/realTime');
const firebase = require("firebase");

realtimeRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
      var user = firebase.auth().currentUser || false;
      if(user){
          Realtime.find({ uid: user.uid })
          .then(result => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(result);
          })
          .catch(err => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json("Error");
          });
      }else{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json("Error");
      }
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /realtime');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /realtime');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported on /realtime');
    });


module.exports = realtimeRouter;
