const express = require("express");
const router = express.Router();
const User = require('../Models/user');
const passport = require("passport");

router.get("/signout", function(req, res){
    req.logout();
    res.status(200).json({
        msg: "success"
    });
});

module.exports = router;