const express = require("express");
const router = express.Router();
const User = require('../Models/user');
const passport = require("passport");

router.post("/signup", function(req, res){
    User.register(new User({username: req.body.username, email: req.body.email}), req.body.password, function(err, user){
        if(err){
            res.status(400).json({
                error: "Account already exist"
            });
        }
        passport.authenticate("local")(req, res, function(){
            res.json({
                user
            });
         });
        
    });
});

module.exports = router;