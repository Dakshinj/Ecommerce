const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../Helper/isLoggedIn');
const { isAdmin } = require('../Helper/isAdmin');
const Product = require('../Models/product');

router.patch("/product/increasequantity/:id", isLoggedIn, isAdmin, function(req, res){
    Product.findByIdAndUpdate(req.params.id, { $inc: {available : 1} }, function(err, data){
        if(err){
            res.status(400).json({
                error: 'Error'
            });
        }else{
            res.status(200).json({
                error: 'No Error. Update done.'
            });
        }
    });
});

router.patch("/product/decreasequantity/:id", isLoggedIn, isAdmin, function(req, res){
    Product.findByIdAndUpdate(req.params.id, { $inc: {available : -1} }, function(err, data){
        if(err){
            res.status(400).json({
                error: 'Error'
            });
        }else{
            res.status(200).json({
                error: 'No Error. Update done.'
            });
        }
    });
});

module.exports = router;