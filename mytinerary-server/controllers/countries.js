const countriesRouter = require('express').Router()
const Country = require('../models/country')

countriesRouter.get('/', async (request, response) => {
    const countries = await Country
        .find({}).populate('city', { name: 1 })

    response.json(countries)    
})

countriesRouter.post('/', async (request, response) => {
    const body = request.body

    const country = new Country({
        name: body.name,
        flag: body.flag,
        cities: []
    })

    const savedCountry = await country.save()
    response.json(savedCountry)
})

countriesRouter.delete('/:id', async (request, response) => {
    const id = String(request.params.id)
    const country = await Country.findById(id)

    if(!country){
        return response.status(400).json({ error: 'country not exist' })
    }

    await Country.findByIdAndDelete(id)
    return response.status(204).end()
})

module.exports = countriesRouter