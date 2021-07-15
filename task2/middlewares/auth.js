const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('../models/userModel')

const authenticate = async (req,res,next)=>{
    
    const token = req.headers.authorization.split(' ')[1]
    let verify = await jwt.verify(token, process.env.SECRET)
    const result = await User.find({_id: verify._id})
    if(result){
        next()
    }else{
        res.status(401).json({
            message: 'User Not Authorized'
        })
    }
}

module.exports = authenticate