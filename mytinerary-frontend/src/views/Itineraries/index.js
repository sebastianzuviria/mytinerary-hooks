import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getItinerariesOf } from '../../reducers/itineraryReducer'
import Itinerary from '../../components/Itinerary/index'
import itineraryServices from '../../services/itineraries'


const Itineraries = ({ match }) => {
    const dispatch = useDispatch()
    const itineraries = useSelector(state => state.itineraries)
    const city = match.params.city
    useEffect(() => {
        dispatch(getItinerariesOf(city))
    }, [dispatch, city])

    const handleFav = async () => {
        await itineraryServices.favItinerary(city)
        dispatch(getItinerariesOf(city))
    }

    return (
        <div>
        <div>Itineraries of {city}</div>
        {itineraries.map(i => { 
            return (
            <Itinerary
                key={i.id}
                functionFav={handleFav}
                itineraryId={i.id} 
                itineraryName={i.name}
                itineraryRating={i.rating}
                itineraryPrice={i.price}
                itineraryImage={i.imgUrl}
                itineraryHashtags={i.hashtags}
                itineraryActivities={i.activities}
                itineraryFavs={i.favs}
                itineraryComments={i.comments}
                city={city}
            />  
            )}       
        )}
        </div>
    )
}

export default Itineraries