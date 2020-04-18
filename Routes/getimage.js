const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../Helper/isLoggedIn');
const Product = require('../Models/product');

router.get("/product/image/:id", isLoggedIn, function(req, res){
    Product.findById(req.params.id, 'image', function(err, data){
        if(err){
            res.status(400).json({
                error: 'no image'
            });
        }else{
            res.set('Content-Type', data.image.contentType);
            res.send(data.image.data);
        }
    });
});

module.exports = router;