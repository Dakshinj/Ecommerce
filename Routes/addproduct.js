const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../Helper/isLoggedIn');
const { isAdmin } = require('../Helper/isAdmin');
const Product = require('../Models/product');
const formidable = require('formidable');
const fs = require('fs');

router.post("/addproduct", isLoggedIn, isAdmin, function(req, res){
    
    var formData = new formidable.IncomingForm();
    formData.keepExtensions = true;
    
    formData.parse(req, (err, fields, files) => {
        
        if (err) {
            return res.status(400).json({
                error: 'Product can not be added.'
            });
        }
        
        var product = new Product(fields);
        
        if (files.image) {
            
            if (files.image.size > 520000) {
                return res.status(400).json({
                    error: 'Image size limit: 512kb'
                });
            }
        
        }
            
        product.image.data = fs.readFileSync(files.image.path);
        product.image.contentType = files.image.type;

        product.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Product can not be added.'
                });
            }

            res.json(data);
        });        

    });
    
 });
 
 module.exports = router;