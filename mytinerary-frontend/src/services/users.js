import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getFavs = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const userServices = {
    getFavs
}

export default userServices