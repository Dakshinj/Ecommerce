const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../Helper/isLoggedIn');
const Cart = require("../Models/cart");

router.get("/cart/get/:id", isLoggedIn, function(req, res){
    Cart.find({ userid: req.params.id }, function(err, data){
        if(err){
            res.status(400).json({
                error: 'No data found'
            });
        }else{
            res.json(data);
        }
    });
});

module.exports = router;