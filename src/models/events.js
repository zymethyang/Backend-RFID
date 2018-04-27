const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var eventsSchema = new Schema({
    tgbd: {
        type: Number,
        required: true
    },
    tgkt: {
        type: Number,
        required: true
    },
    ten: {
        type: String,
        required: true
    },
    diemCong: {
        type: Number,
        required: true
    },
    thDu: {
        type: Number,
        required: false
    }
});


var Events = mongoose.model('Event', eventsSchema);
module.exports = Events;
