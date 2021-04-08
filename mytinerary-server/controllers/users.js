const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Itinerary = require('../models/itinerary')

usersRouter.get('/:id', async (request,response) => {
    const id = request.params.id

    const user = await User
        .findById(id)
        .populate({
            path: 'favs',
            populate: {
                path: 'comments',
                populate: 'user'
            }
        })
        .populate({
            path: 'favs',
            populate: {
                path:'activities'
            }
        })

    response.json(user)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
        favs: [],
        likedComments: [],
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.put('/:id', async (request, response) => {
    const userId = request.params.id
    const user = await User.findById(userId)
    const itineraryId = request.body.itineraryId
    const itinerary = await Itinerary.findById(itineraryId)
    
    if (!user || !itinerary) {
        response.status(400).json({ error: 'User or itinerary not exist'})
    }

    itinerary.favs = itinerary.favs.filter(u => String(u) !== String(user._id))
    user.favs = user.favs.filter(i => String(i) !== String(itinerary._id))
     
    await itinerary.save()
    const updatedUser = await user.save()

    response.json(updatedUser)
})

module.exports = usersRouter