const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  flagImgUrl: {
    type: String
  },
  cities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City'
    }
  ]
})

countrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

countrySchema.plugin(uniqueValidator)

const Country = mongoose.model('Country', countrySchema)

module.exports = Country
