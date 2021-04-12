import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/activities'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const favActivity = async id => {
  console.log(token)
  const config = {
    headers: { Authorization: token }
  }

  console.log(config)
  const response = await axios.put(`${baseUrl}/${id}`, null, config)
  return response.data
}

const activityServices = {
  setToken,
  favActivity
}

export default activityServices
