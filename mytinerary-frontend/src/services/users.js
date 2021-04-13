import axios from 'axios'
const baseUrl = '/api/users'

const getFavs = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const unFav = async (userId, itineraryId) => {
  const response = await axios.put(`${baseUrl}/${userId}`, { itineraryId })
  return response.data
}

const userServices = {
  getFavs,
  unFav
}

export default userServices
