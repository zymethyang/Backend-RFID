const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var codeSchema = new Schema({
    code:  {
        type: Number,
        required:true,
        unique:true
    },
    value:{
      type:String,
      require:true
    }
});




var Code = mongoose.model('errorcode', codeSchema);
module.exports = Code;
