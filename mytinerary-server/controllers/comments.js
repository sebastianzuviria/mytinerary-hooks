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

commentsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const comment = await Comment.findById(id)
    const itinerary = await Itinerary.findById(comment.itinerary)
    
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodedToken.id) 

    if (String(comment.user) === String(user._id)) {
        const deletedComment = await Comment.findByIdAndDelete(id)
        
        user.comments = user.comments.filter(c => String(c) !== String(deletedComment._id))
        itinerary.comments = itinerary.comments.filter(c => String(c) !== String(deletedComment._id))
        
        await user.save()
        await itinerary.save()
        
        response.status(204).end()
    } else {
        response.status(400).json({ error: 'only comment\'s author can delete it' })
    }


})

commentsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const comment = await Comment.findById(id)
    const wasLiked = comment.likes.find(l => String(l) === String(user._id))
    const wasDisliked = comment.dislikes.find(d => String(d) === String(user._id))

    if (!user || !comment) {
        response.status(400).json({ error: 'user or comment not found'})
    }


    if(body.isLiked) {
        console.log('liked')

        if (wasLiked) {
            comment.likes = comment.likes.filter(l => String(l) !== String(user._id))
            user.likedComments = user.likedComments.filter(l => String(l) !== String(comment._id))

            await user.save()
            await comment.save()

            response.status(200).end()
        } else if (wasDisliked) {
            comment.dislikes = comment.dislikes.filter(d => String(d) !== String(user._id))
            comment.likes = comment.likes.concat(user._id)
            
            user.dislikedComments = user.dislikedComments.filter(d => String(d) !== String(comment._id))
            user.likedComments = user.likedComments.concat(comment._id)
            
            await comment.save()
            await user.save()
            
            response.status(200).end()
        } else {
        comment.likes = comment.likes.concat(user._id)
        user.likedComments = user.likedComments.concat(comment._id)
        
        await comment.save()
        await user.save()
        
        response.status(200).end()
        }
    } else if (body.isDisliked) {
        if (wasDisliked) {
            comment.dislikes = comment.dislikes.filter(d => String(d) !== String(user._id))
            user.dislikedComments = user.dislikedComments.filter(d => String(d) !== String(comment._id))
            
            await comment.save()
            await user.save()
            
            response.status(200).end()
        } else if (wasLiked) {
            comment.likes = comment.likes.filter(l => String(l) !== String(user._id))
            comment.dislikes = comment.dislikes.concat(user._id)
            
            user.likedComments = user.likedComments.filter(l => String(l) !== String(comment._id))
            user.dislikedComments = user.dislikedComments.concat(comment._id)
            
            await comment.save()
            await user.save()
            
            response.status(200).end()
        } else {
        comment.dislikes = comment.dislikes.concat(user._id)
        user.dislikedComments = user.dislikedComments.concat(comment._id)
        
        await comment.save()
        await user.save()
        
        response.status(200).end()
        }    
    }
})

module.exports = commentsRouter