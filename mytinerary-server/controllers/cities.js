const citiesRouter = require('express').Router()
const City = require('../models/city')
const Country = require('../models/country')

citiesRouter.get('/', async (request, response) => {
  const cities = await City
    .find({}).populate('country', { name: 1, flagImgUrl: 1, id: 1 })

  response.json(cities)
})

citiesRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  const city = await City.findById(id)

  response.json(city)
})

citiesRouter.post('/', async (request, response) => {
  const body = request.body

  const country = await Country
    .findOne({ name: body.country })

  if (country) {
    const city = new City({
      name: body.name,
      country: country._id,
      imgUrl: body.imgUrl,
      url: body.url
    })

    const savedCity = await city.save()
    country.cities = country.cities.concat(savedCity._id)
    await country.save()
    response.json(savedCity)
  } else {
    const country = new Country({
      name: body.country,
      flagImgUrl: '',
      cities: []
    })

    await country.save()

    const savedCountry = await Country
      .findOne({ name: body.country })

    const city = new City({
      name: body.name,
      country: savedCountry._id,
      imgUrl: body.imgUrl,
      url: body.url
    })

    const savedCity = await city.save()
    savedCountry.cities = savedCountry.cities.concat(savedCity._id)
    await savedCountry.save()
    response.json(savedCity)
  }
})

citiesRouter.delete('/:id', async (request, response) => {
  const id = String(request.params.id)
  const city = await City.findById(id)

  if (!city) {
    return response.status(400).json({ error: 'city not exist' })
  }

  await City.findByIdAndDelete(id)
  response.status(204).end()
})

citiesRouter.put('/:id', async (request, response) => {
  const body = request.body
  const city = await City.findById(request.params.id)

  const modifiedCity = new City({
    name: body.name,
    country: city.country,
    imgUrl: body.imgUrl,
    url: body.url
  })

  const updatedCity = await City.findByIdAndUpdate(request.params.id, modifiedCity, { new: true })
  response.json(updatedCity)
})

module.exports = citiesRouter
