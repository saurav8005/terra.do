const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');

router.get('/',(req,res)=>{
    res.send('User routes are working')
})

router.post('/register', async(req,res)=>{
     
      try {
        const {name, email, password} = req.body;
        const user = new User({
            name, email , password
        });
        await user.save();
        res.status(201).send({user,
            message : "User is Created Successfully"
        })
        
      } catch (error) {
        res.status(400).send({error: err})
      }
})

router.post("/login", 
body('email').isEmail(), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // 2. check Username already exists
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                status: "Failed",
                message: "Unnown user/ User is not registered"
            })
        }
       
        bcrypt.compare(password, user.password, function(err, result) {
            
            if(err){
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                })
            }
            if(result) {
                return res.status(200).json({
                    status: "Succces",
                    message: "Login successful"
                })
            }else {
                return res.status(400).json({
                    status: "Failed",
                    message: "Invalid credentails"
                })
            }
        });


    } catch (e) {
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
    
});

module.exports = router;

