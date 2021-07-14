const express = require('express')
const app = express()

// configuring environment variables
const env = require('dotenv')
env.config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// adding mongoose
const mongoose = require('mongoose')
//connecting to database
mongoose.connect(`mongodb+srv://${process.env.MONGODB_ATLAS_USER}:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.9ciew.mongodb.net/${process.env.MONGODB_ATLAS_DATABASE}?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//registering routes
const userRoutes = require('./routes/user')
const newsRoute = require('./routes/news')
const weatherRoute  = require('./routes/weather')

app.use('/user', userRoutes)
app.use('/',newsRoute)
app.use('/', weatherRoute)

app.listen(process.env.PORT, ()=>{
    console.log('connected')
})