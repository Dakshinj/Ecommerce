const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{type:String, trim:true, required:true},
    description:{type:String, required:false},
    price:{type:Number, required:true},
    available:{type:Number, required:true},
    image:{data: Buffer, contentType: String}
});

module.exports = mongoose.model("Product", productSchema);