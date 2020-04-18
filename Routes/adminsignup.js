const express = require("express");
const router = express.Router();
const User = require('../Models/user');
const passport = require("passport");
const { isLoggedIn } = require('../Helper/isLoggedIn');
const { isAdmin } = require('../Helper/isAdmin');

router.post("/adminsignup", isLoggedIn, isAdmin, function(req, res){
    User.register(new User({username: req.body.username, email: req.body.email, admin: req.body.admin}), req.body.password, function(err, user){

        if(err){
            res.status(400).json({
                error: "Account already exist."
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