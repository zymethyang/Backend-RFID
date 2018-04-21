const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var devicesSchema = new Schema({
    startedAt:  {
        type: Number,
        required: true
    },
    name:  {
        type: Object,
        required:true
    },
    uid: {
        type: String,
        required:true
    },
    updatedAt:  {
        type: Number,
        required: true
    }
});




var Devices = mongoose.model('Device', devicesSchema);
module.exports = Devices;
