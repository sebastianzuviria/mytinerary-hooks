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

    const response = await axios.post(baseUrl, comment, config)
    return response.data
}

const deleteComment = async (commentId) => {
    const config = {
        headers: { Authorization: token }
    }

    await axios.delete(`${baseUrl}/${commentId}`, config)
}

const commentServices = {
    setToken,
    getAll,
    comment,
    deleteComment,
}

export default commentServices