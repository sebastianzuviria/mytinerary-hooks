import cityServices from '../services/cities'

const cityReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_CITIES':
      return action.data
    default:
      return state
  }
}

export const getCities = () => {
  return async dispatch => {
    const cities = await cityServices.getAll()
    dispatch({
      type: 'GET_CITIES',
      data: cities
    })
  }
}

export default cityReducer
