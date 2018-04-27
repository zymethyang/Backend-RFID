const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var studentSchema = new Schema({
    sktg: {
        type: Array,
        required: false
    },
    ten: {
        type: String,
        required: true
    },
    diem: {
        type: Number,
        required: false
    },
    id: {
        type: Number,
        required: true
    }
});


var Student = mongoose.model('Student', studentSchema);
module.exports = Student;
