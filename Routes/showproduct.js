const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../Helper/isLoggedIn');
const Product = require('../Models/product');

router.get("/showproduct", isLoggedIn, function(req, res){
    Product.find({}, '-image', function(err, data){
        if (err) {
            return res.status(400).json({
                error: 'No product available'
            });
        }else{
            res.json(data);
        }
    });
});

module.exports = router;