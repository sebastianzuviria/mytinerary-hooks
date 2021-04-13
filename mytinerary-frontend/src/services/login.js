import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const loginGoogle = async googleData => {
  const response = await axios.post(`${baseUrl}/auth/google`, googleData)
  return response.data
}

const loginServices = {
  login,
  loginGoogle
}

export default loginServices
