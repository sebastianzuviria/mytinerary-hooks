import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/itineraries'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getItinerariesOf = async (city) => {
    const response = await axios.get(`${baseUrl}/${city}`)
    return response.data
}

const itineraryServices = {
    getAll,
    getItinerariesOf
}

export default itineraryServices