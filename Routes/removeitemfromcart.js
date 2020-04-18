const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../Helper/isLoggedIn');
const Cart = require("../Models/cart");

router.delete("/cart/remove/:id", isLoggedIn, function(req, res){
    Cart.deleteMany({ userid: req.params.id }, function(err, data) {
        if (err) {
            return res.status(400).json({
                error: 'Data can not be removed.'
            });
        }else {
            return res.status(200).json({
                data
            });
        }
    });
});

module.exports = router;