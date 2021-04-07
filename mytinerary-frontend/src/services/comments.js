import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/comments'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const comment = async (comment) => {
    const config = {
        headers: { Authorization: token }
    }

    console.log(comment)
    const response = await axios.post(baseUrl, comment, config)
    return response.data
}

const commentServices = {
    setToken,
    getAll,
    comment,
}

export default commentServices