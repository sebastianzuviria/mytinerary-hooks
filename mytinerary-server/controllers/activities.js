const activitiesRouter = require('express').Router()
const Activity = require('../models/activity')
const Itinerary = require('../models/itinerary')

activitiesRouter.get('/', async (resquest, response) => {
    const activities = await Activity
        .find({}).populate('itinerary', { name: 1, id: 1 })

    response.json(activities)
})

activitiesRouter.post('/', async (request, response) => {
    const body = request.body
    const itinerary = await Itinerary.findById(body.itinerary)

    if (!itinerary) {
        response.status(400).json({ error: 'itinerary not exist' })
    }

    const activity = new Activity({
        name: body.name,
        address: body.address,
        img: body.img,
        duration: body.time,
        price: body.price,
        description: body.description,
        itinerary: itinerary._id,
        comments: [],
        favs: [],
    })

    const savedActivity = await activity.save()
    response.json(savedActivity)
})

module.exports = activitiesRouter