const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    name:String,
    password:String,
    email:{
        type:String,
        required:true,
        unique:true
    }
});

let userModel = mongoose.model('user',userSchema);

module.exports = userModel;