import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getItinerariesOf } from '../../reducers/itineraryReducer'

const Itineraries = ({ match }) => {
    const dispatch = useDispatch()
    const itineraries = useSelector(state => state.itineraries)
    const city = match.params.city
    useEffect(() => {
        dispatch(getItinerariesOf(city))
    }, [dispatch, city])
  
    return (
        <div>
        <div>Itineraries of {city}</div>
        {itineraries.map(i => {
            return (
                <div key={i.id}>
                    <div>name: {i.name}</div>
                    <div>rating: {i.rating}</div>
                    <div>price: {i.price}</div>
                    <div>hashtags: {i.hashtags.map(h => <div key={h}>{h}</div>)}</div>
                </div>
                
            )
        })}
        </div>
    )
}

export default Itineraries