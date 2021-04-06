const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/:id', async (request,response) => {
    const id = request.params.id

    const user = await User.findById(id).populate('favs')

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

module.exports = usersRouter