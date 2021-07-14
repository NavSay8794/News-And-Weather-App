const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

const { weatherMapper } = require('../middlewares/datamapper')

router.get('/weather' ,async (req,res,next)=>{
    try{
        let search = req.query.q
        let result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=12.9762&lon=77.6033&exclude=hourly,minutely,alerts&appid=74bca61d1fec2b5f57cc888a169a07ef`)
        // let result = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?q=${search}&appid=74bca61d1fec2b5f57cc888a169a07ef`)
        let weatherData = await result.json()
        // console.log(weatherData)
        let data = await weatherMapper(weatherData)
        res.status(200).json({
            message:'Done',
            data
        })
    }catch(err){
        res.status(500).json({
            message:'Something Went Wrong'
        })
    }
})

module.exports = router