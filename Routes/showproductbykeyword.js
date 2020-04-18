const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../Helper/isLoggedIn');
const Product = require('../Models/product');

router.get("/showproductbykeyword/:id", isLoggedIn, function(req, res){
    Product.find({ "name": { "$regex": req.params.id, "$options": "i" } }, '-image', function(err, data){
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