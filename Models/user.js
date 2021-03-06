const mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username:{type:String, trim:true, required:true},
    email:{type:String, trim:true, required:true},
    password:{type:String},
    admin:{type:Number, default: 0} 
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);