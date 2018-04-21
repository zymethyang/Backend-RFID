const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var feedbackSchema = new Schema({
    startedAt:  {
        type: Number,
        required: true
    },
    status:  {
        type: Object,
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




var Feedback = mongoose.model('feedback', feedbackSchema);
module.exports = Feedback;
