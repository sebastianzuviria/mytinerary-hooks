import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/cities'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getCity = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const cityServices = {
    getAll,
    getCity
}

export default cityServices