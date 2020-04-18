const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../Helper/isLoggedIn');
const History = require("../Models/history");

router.post("/addhistory", isLoggedIn, function(req, res){
    const history = new History(req.body);
    history.save((err, data) => {
        if(err){
            //console.log(err);
            return res.status(400).json({
                error: 'Data cannot be added.'
            });
        }
        res.status(200).json({
            msg: "History added."
        });
    })
});

module.exports = router;