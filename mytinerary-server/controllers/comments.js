const jwt = require('jsonwebtoken')
const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const User = require('../models/user')
const Itinerary = require('../models/itinerary')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
}

commentsRouter.get('/', async (request, response) => {
    const comments = await Comment.find({}).populate('user', { username: 1, id: 1 })

    response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const itinerary = await Itinerary.findById(body.itinerary)

    if(!user) {
        response.status(400).json({ error: 'invalid token'})
    }

    if (!itinerary) {
        response.status(400).json({ error: 'itinerary not exist'})
    } 

    const comment = new Comment({
        content: body.content,
        user: user._id,
        itinerary: itinerary._id,
        likes: [],
        dislikes: []
    })

    const savedComment = await comment.save()
    user.comments = user.comments.concat(savedComment._id)
    itinerary.comments = itinerary.comments.concat(savedComment._id)
    await user.save()
    await itinerary.save()

    response.json(savedComment)
})

module.exports = commentsRouter