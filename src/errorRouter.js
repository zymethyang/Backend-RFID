const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const errorRouter = express.Router();
errorRouter.use(bodyParser.json());

const Errors = require('./models/error');
const Code = require('./models/code');
const Messagings = require('./models/messagings');
var FieldValue = require('firebase-admin').firestore.FieldValue;
var moment = require('moment');
const firebase = require("firebase");

errorRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
      var user = firebase.auth().currentUser || false;
      if (user) {
           Errors.findOne({ uid: user.uid }).sort({ updatedAt: -1 })
              .then(error => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(error);
              })
              .catch(err => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json('Error');
              });
      } else {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.json('Error');
      }
    })
    .post((req, res, next) => {
      var user = firebase.auth().currentUser || false;
      if(user){
        Errors.create({
          uid: user.uid,
          status: req.body,
          startedAt: moment(FieldValue.serverTimestamp()).unix(),
          updatedAt: moment(FieldValue.serverTimestamp()).unix()
        }).then(result => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json('Successful');
        }).catch((err) => {
          console.log(err);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json('Error');
        });
      }else{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json("Error");
      }
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /feedback');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /feedback');
    });


    errorRouter.route('/code/:code')
        .all((req, res, next) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.header('Access-Control-Allow-Origin', '*');
            next();
        })
        .get((req, res) => {
          var numCode = parseInt(req.params.code);
          Code.findOne({code:numCode})
             .then(error => {
                 res.statusCode = 200;
                 res.setHeader('Content-Type', 'application/json');
                 res.json(error);
             })
             .catch(err => {
                 res.statusCode = 200;
                 res.setHeader('Content-Type', 'application/json');
                 res.json('Error');
             });
        })
        .post((req, res, next) => {
          res.statusCode = 403;
          res.end('POST operation not supported on /error');
        })
        .put((req, res, next) => {
            res.statusCode = 403;
            res.end('PUT operation not supported on /error');
        })
        .delete((req, res, next) => {
            res.statusCode = 403;
            res.end('DELETE operation not supported on /error');
        });
module.exports = errorRouter;
