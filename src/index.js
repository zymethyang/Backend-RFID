require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')

var config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useMongoClient: true,
});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: '*' }));

var port = process.env.PORT || 5000;

const router = require('./routes');
const eventsRouter = require('./eventRouter');
const studentRouter = require('./studentRouter');


app.use('/', router);
app.use('/event', eventsRouter);
app.use('/student', studentRouter);

app.listen(port);


console.log(`Server listening at ${port}`);
