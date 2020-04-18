const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../Helper/isLoggedIn');
const History = require('../Models/history');

router.get("/getordernumbermax", isLoggedIn, function(req, res){
    History.findOne({})
        .sort('-ordernumber').exec(function (err, data) {
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