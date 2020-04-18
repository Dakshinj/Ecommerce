const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../Helper/isLoggedIn');
const Product = require('../Models/product');

router.get("/showproductbyid/:id", isLoggedIn, function(req, res){
    Product.findById(req.params.id, '-image', function(err, data){
        if(err){
            res.status(400).json({
                error: 'Error'
            });
        }else{
            res.json(data);
        }
    });
});

module.exports = router;