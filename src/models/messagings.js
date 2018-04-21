const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var messagingsSchema = new Schema({
    startedAt:  {
        type: Number,
        required: true
    },
    token:  {
        type: String,
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


var Messagings = mongoose.model('Messaging', messagingsSchema);
module.exports = Messagings;
