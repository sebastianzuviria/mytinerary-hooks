const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country'
  },
  imgUrl: {
    type: String
  },
  url: {
    type: String
  }
})

citySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

citySchema.plugin(uniqueValidator)

const City = mongoose.model('City', citySchema)

module.exports = City
