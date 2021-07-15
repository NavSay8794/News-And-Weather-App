const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

//adding model
const User = require('../models/userModel')

// adding hasing middlewarre
const { hashing, unhash } = require('../middlewares/passHash')

router.post('/sign-up', async (req, res, next) => {
    try {
        let userFetched = await User.find({ email: req.body.email })
        if (userFetched.length) {
            return res.status(401).json({
                message: 'User Already Registered'
            })
        } else {
            let hashedPassword = await hashing(req.body.password)
            let userDetails = {
                _id: mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword
            }
            let newUser = new User(userDetails)
            
            let result = await newUser.save()
            
            if (result) {
                res.status(200).json({
                    message: 'User Registered Successfully',
                    result
                })
            } else {
                res.status(500).json({
                    message: 'Error while registering'
                })
            }

        }

    } catch (err) {
        res.status(500).json({
            message: 'Something Went Wrong'
        })
    }
})

router.post('/login', async (req,res,next)=>{
    try{
        let userDet = await User.find({email: req.body.email})
        if(userDet.length !== 1){
            return res.status(404).json({
                message: 'User Not Registered'
            })
        }else{
            let passCompare = await unhash(req.body.password, userDet[0].password)
            if(passCompare){
                let token = jwt.sign({_id: userDet[0]._id}, process.env.SECRET);
                res.status(201).json({
                    message:'User Logged In Successfully',
                    token
                })
            }else{
                res.status(401).json({
                    message:'Incorrect Password',
                })
            }
        }
    }catch(err){
        res.status(500).json({
            message:'Something Went Wrong'
        })
    }
})


module.exports = router