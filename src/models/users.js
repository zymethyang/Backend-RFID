var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
    email: {
        type: String,
        default: ''
    },
    uid: {
        type: String,
        unique: true,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    course: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Users', Users);