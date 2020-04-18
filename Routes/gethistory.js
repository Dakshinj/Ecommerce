const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../Helper/isLoggedIn');
const { isAdmin } = require('../Helper/isAdmin');
const History = require('../Models/history');

router.get("/gethistory", isLoggedIn, isAdmin, function(req, res){
    History.find({}, function(err, data){
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