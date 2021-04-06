import itineraryServices from '../services/itineraries'

const itineraryReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_ITINERARIES':
            return action.data
        default:
            return state
    }
}

export const getItinerariesOf = (cityName) => {
    return async dispatch => {
        const itineraries = await itineraryServices.getItinerariesOf(cityName)
        dispatch({
            type: 'GET_ITINERARIES',
            data: itineraries
        })
    }
}

export default itineraryReducer