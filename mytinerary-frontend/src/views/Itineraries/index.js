import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getItinerariesOf } from '../../reducers/itineraryReducer'
import Itinerary from '../../components/Itinerary/index'

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
        {itineraries.map(i => 
            <Itinerary
                key={i.id} 
                itineraryName={i.name}
                itineraryRating={i.rating}
                itineraryPrice={i.price}
                itineraryHashtags={i.hashtags}
                itineraryActivities={i.activities}
                itineraryFavs={i.favs}
                city={city}
            />         
        )}
        </div>
    )
}

export default Itineraries