const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var statusChema = new Schema({
    cCalender:{
      type:Boolean,
      required:true
    },
    cHand:{
      type:Boolean,
      required:true
    },
    cHumidity:{
      type:Boolean,
      required:true
    },
    cTemp:{
      type:Boolean,
      required:true
    },
    humidity:{
      type:Number,
      required:false
    },
    temp:{
      type:Number,
      required:false
    },
    time:{
      type:String,
      required:false
    },
    duration:{
      type:Number,
      required:true
    },
    to:{
      type:Number,
      required:true
    },
    bump:{
      type:Object,
      required:true
    },
    from:{
      type:Number,
      required:false
    }
})

var bumpsSchema = new Schema({
    startedAt:  {
        type: Number,
        required: true
    },
    status:  {
        type: statusChema,
        required:false
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




var Bumps = mongoose.model('Bump', bumpsSchema);
module.exports = Bumps;
