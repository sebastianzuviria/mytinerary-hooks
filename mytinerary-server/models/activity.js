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
    duration: {
        type: Number,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    itinerary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itinerary' 
    },
    comments: [ 
        // {        
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Comment'
        // }   
    ],
    favs: [
        // {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User' 
        // }
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