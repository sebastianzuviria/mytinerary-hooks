const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    unlikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment