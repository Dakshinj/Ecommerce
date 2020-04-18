const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../Helper/isLoggedIn');
const Cart = require("../Models/cart");

router.post("/cart/add", isLoggedIn, function(req, res){
    const cart = new Cart(req.body);
    cart.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: 'Data cannot be added.'
            });
        }
        res.status(200).json({
            data
        });
    })
});

module.exports = router;