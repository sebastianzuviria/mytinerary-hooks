const express = require('express')
const app = express()
const mongoose = require('mongoose')
const countriesRouter = require('./controllers/countries')
const citiesRouter = require('./controllers/cities')
const itinerariesRouter = require('./controllers/itineraries')
const activitiesRouter = require('./controllers/activities')

const MONGODB_URI = 'mongodb+srv://szuviria:321321321@mytinerary-app.aiu01.mongodb.net/mytinerary?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then( result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message )
    })

app.use(express.json())
app.use('/**', (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('------')
    next()
})

app.get('/', (req, res) => {
    res.send('hello seba')
})

app.use('/api/countries', countriesRouter)
app.use('/api/cities', citiesRouter)
app.use('/api/itineraries', itinerariesRouter)
app.use('/api/activities', activitiesRouter)



module.exports = app