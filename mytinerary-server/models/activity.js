const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    img: {
        type: String,
    },
    time: {
        type: Number,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    comments: [ 
        {        
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }   
    ],
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
    ],
})

activitySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity