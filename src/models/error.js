const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var errorSchema = new Schema({
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
        required:true
    },
    updatedAt:  {
        type: Number,
        required: true
    }
});




var Errors = mongoose.model('error', errorSchema);
module.exports = Errors;
