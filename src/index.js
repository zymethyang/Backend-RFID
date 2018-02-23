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
const userRouter = require('./userRouter');
const tempRouter = require('./tempRouter');
const humidityRouter = require('./humidityRouter');
const bumpRouter = require('./bumpRouter');
const devicesRouter = require('./devicesRouter');
const realTimeRouter = require('./realtimeRouter');
const messagingRouter = require('./messagingRouter');
const feedbackRouter = require('./feedbackRouter');
const errorRouter = require('./errorRouter');
const courseRouter = require('./courseRouter');
const uploadRouter = require('./uploadRouter');

app.use('/', router);
app.use('/temp', tempRouter);
app.use('/humidity', humidityRouter);
app.use('/user', userRouter);
app.use('/bump', bumpRouter);
app.use('/device', devicesRouter);
app.use('/realtime', realTimeRouter);
app.use('/messaging', messagingRouter);
app.use('/feedback', feedbackRouter);
app.use('/error', errorRouter);
app.use('/course', courseRouter);
app.use('/upload',uploadRouter);

app.listen(port);


console.log(`Server listening at ${port}`);
