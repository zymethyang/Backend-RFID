const express = require('express');
const bodyParser = require('body-parser');
const feedbackRouter = express.Router();
feedbackRouter.use(bodyParser.json());

const Feedback = require('./models/feedback');
var FieldValue = require('firebase-admin').firestore.FieldValue;
var moment = require('moment');
const firebase = require("firebase");

feedbackRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
      var user = firebase.auth().currentUser || false;
      if(user){
          Feedback.find({ uid: user.uid })
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
      res.end('POST operation not supported on /feedback');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /feedback');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /feedback');
    });

module.exports = feedbackRouter;
