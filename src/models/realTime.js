const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var realtimeSchema = new Schema({
    startedAt:  {
        type: Number,
        required: true
    },
    status:  {
        type: Array,
        required:true
    },
    uid: {
        type: String,
        required:true,
        unique:true
    },
    updatedAt:  {
        type: Number,
        required: true
    }
});




var Realtime = mongoose.model('realtime', realtimeSchema);
module.exports = Realtime;
