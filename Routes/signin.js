const express = require("express");
const router = express.Router();
const User = require('../Models/user');
const passport = require("passport");

router.post("/signin", passport.authenticate("local", {

    }) ,function(req, res){
        req.user.hash = undefined;
        req.user.salt = undefined;
        req.session.userAdmin = req.user.admin;
        res.status(200).json({
            body:req.user
        });
});

module.exports = router;