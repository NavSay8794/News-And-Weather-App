const express = require('express');
const bcrypt = require('bcryptjs')

let hashing = async (password)=>{
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt)
    return hash
}

let unhash = async (password, hash)=>{
    let isAuthentic = await bcrypt.compare(password,hash)
    return isAuthentic
}


module.exports = {
    hashing,
    unhash
}