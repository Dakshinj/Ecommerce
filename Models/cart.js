const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userid:{type:String, required:true},
    productlist:[{
        productid:{type:String, required:true},
        name:{type:String, required:true},
        quantity:{type:Number, required:true},
        available:{type:Number, required:true},
        price:{type:Number, required:true}
    }]
});

module.exports = mongoose.model("Cart", cartSchema);