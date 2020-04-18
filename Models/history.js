const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    ordernumber:{type:Number, required:true},
    firstname:{type:String, trim:true, required:true},
    lastname:{type:String, trim:true, required:true},
    email:{type:String, trim:true, required:true},
    address:{type:String, trim:true, required:true},
    country:{type:String, trim:true, required:true},
    state:{type:String, trim:true, required:true},
    zip:{type:String, trim:true, required:true},
    totalprice:{type:Number, required:true},
    productlist:[
        {
            name:{type:String, trim:true, required:true},
            quantity:{type:Number, required:true},
            unitprice:{type:Number, required:true}
        }
    ],
    purchaseDate:{type: Date, default: Date.now}
});

module.exports = mongoose.model("History", historySchema);