const itinerariesRouter = require('express').Router()
const Itinerary = require('../models/itinerary')
const City = require('../models/city')

itinerariesRouter.get('/', async (request, response) => {
    const itineraries = await Itinerary
        .find({}).populate('city', { name: 1, id: 1, country: 1 })

    response.json(itineraries)
})

itinerariesRouter.post('/', async (request, response) => {
    const body = request.body
    const city = await City.findOne({ name: body.city })

    if (!city) {
        response.status(400).json({ error: 'city not exist'})
    }

    const itinerary = new Itinerary({
        name: body.name,
        city: city._id,
        user: '',
        userPhotos: body.userPhotos,
        rating: body.rating,
        duration: body.duration,
        price: body.price,
        hashtags: body.hashtags,
        activities: [],
    })

    const savedItinerary = await itinerary.save()
    response.json(savedItinerary)
})

module.exports = itinerariesRouter