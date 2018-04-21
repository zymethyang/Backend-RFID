var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Courses = new Schema({
    id: {
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    member: {
        type: Array,
        default: []
    },
    stream: {
        type: [StreamChema]
    },
    document: {
        type: [DocumentSchema]
    },
    startedAt: {
        type: Number
    },
    updatedAt: {
        type: Number
    }

});

var StreamChema = new Schema({
    category: {
        type: [CategorySchema]
    },
    body: {
        type: String,
        default: ''
    }
});


var CategorySchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    uid: {
        type: String,
        default: ''
    }
});

var DocumentSchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Courses', Courses);