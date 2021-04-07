const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    user: {
        type: String,
    },
    userPhotos: [
        {
            type: String,
        }
    ],
    rating: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    price: {
        type: Number,
    },
    hashtags: [
        {
            type: String,
        }
    ],
    activities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity'
        }
    ],
    favs: [
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'User' 
        }
    ],
    comments: [
        {        
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
       }  
    ]
})

itinerarySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Itinerary = mongoose.model('Itinerary', itinerarySchema)

module.exports = Itinerary