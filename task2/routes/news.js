const express = require('express')
const router = express.Router() 
const fetch = require('node-fetch')

// adding authenticator
const authenticate = require('../middlewares/auth')

//adding data mapperr
const { newsMapper } = require('../middlewares/datamapper')


router.get('/news', authenticate, async (req, res, next) => {
    try {
        let search = req.query.q
        let result = await fetch(`https://newsapi.org/v2/top-headlines?q=${search}&apiKey=ebf6741b468c4540a8f0a6b7d89e0f81`)
        let topNews = await result.json()
        if (topNews.status === 'ok') {
            let data = await newsMapper(topNews)
            res.status(200).json({
                message: 'working',
                data
            })
        }else{
            res.status(404).json({
                message:'Data cannot be retrieved'
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Something Went Wrong'
        })
    }
})

module.exports = router