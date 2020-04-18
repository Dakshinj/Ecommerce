const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../Helper/isLoggedIn');
const { isAdmin } = require('../Helper/isAdmin');

router.get("/test", isLoggedIn, isAdmin, function(req, res){
    res.json({
        msg: "testing:loggedIn"
    });
 });
 
 module.exports = router;