const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var humiditysSchema = new Schema({
    startedAt:  {
        type: Number,
        required: true
    },
    humidity:  {
        type: Object,
        required:false
    },
    uid: {
        type: String,
        required:true
    },
    updatedAt:  {
        type: Number,
        required: true
    },
    mean:{
        type:Number,
        required:false
    }
});


var Humiditys = mongoose.model('Humidity', humiditysSchema);
module.exports = Humiditys;
