import itineraryServices from '../services/itineraries'

const itineraryReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_ITINERARIES':
            return action.data
        default:
            return state
    }
}

export const getItinerariesOf = (city) => {
    return async dispatch => {
        const itineraries = await itineraryServices.getItinerariesOf(city)
        console.log(itineraries)
        dispatch({
            type: 'GET_ITINERARIES',
            data: itineraries
        })
    }
}

export default itineraryReducer