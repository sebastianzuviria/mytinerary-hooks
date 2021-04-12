const countriesRouter = require('express').Router()
const Country = require('../models/country')

countriesRouter.get('/', async (request, response) => {
  const countries = await Country
    .find({}).populate('cities', { name: 1, img: 1, url: 1, id: 1 })

  response.json(countries)
})

countriesRouter.post('/', async (request, response) => {
  const body = request.body

  const country = new Country({
    name: body.name,
    flagImgUrl: body.flagImgUrl,
    cities: []
  })

  const savedCountry = await country.save()
  response.json(savedCountry)
})

countriesRouter.delete('/:id', async (request, response) => {
  const id = String(request.params.id)
  const country = await Country.findById(id)

  if (!country) {
    return response.status(400).json({ error: 'country not exist' })
  }

  await Country.findByIdAndDelete(id)
  return response.status(204).end()
})

countriesRouter.put('/:id', async (request, response) => {
  const body = request.body
  const country = await Country.findById(request.params.id)

  const newCountry = {
    name: body.name,
    flagImgUrl: body.flagImgUrl,
    cities: country.cities
  }

  const updatedCountry = await Country.findByIdAndUpdate(request.para.id, newCountry, { new: true })
  response.json(updatedCountry)
})

module.exports = countriesRouter
