const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var tempSchema = new Schema({
    startedAt:  {
        type: Number,
        required: true
    },
    temp:  {
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


var Temps = mongoose.model('Temp', tempSchema);
module.exports = Temps;
