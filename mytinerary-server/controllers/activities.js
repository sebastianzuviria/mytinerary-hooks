const jwt = require('jsonwebtoken')
const activitiesRouter = require('express').Router()
const Activity = require('../models/activity')
const Itinerary = require('../models/itinerary')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

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
    imgUrl: body.imgUrl,
    duration: body.duration,
    price: body.price,
    description: body.description,
    itinerary: itinerary._id,
    comments: []
  })

  const savedActivity = await activity.save()
  itinerary.activities = itinerary.activities.concat(savedActivity._id)
  itinerary.save()
  response.json(savedActivity)
})

activitiesRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const activity = await Activity.findById(id)

  if (!activity || !user) {
    response.status(400).json({ error: 'activity not exist' })
  }

  if (activity.favs.find(u => String(u) === String(user._id))) {
    activity.favs = activity.favs.filter(u => String(u) !== String(user._id))
    const favedActivity = await activity.save()

    user.favs = user.favs.filter(a => String(a) !== String(favedActivity._id))
    await user.save()

    response.json(favedActivity)
  } else {
    activity.favs = activity.favs.concat(user._id)
    const favedActivity = await activity.save()

    user.favs = user.favs.concat(favedActivity._id)
    await user.save()

    response.json(favedActivity)
  }
})

module.exports = activitiesRouter
