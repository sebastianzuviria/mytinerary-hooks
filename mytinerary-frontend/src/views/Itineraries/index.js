import './index.css'
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

  const handleFav = async (itineraryId) => {
    await itineraryServices.favItinerary(itineraryId)
    dispatch(getItinerariesOf(city))
  }

  const capitalizeString = (string) => {
    return string.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
  }

  return (
    <div className='Itineraries'>
      <h3>Itineraries of {capitalizeString(city)}</h3>
      <div>
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
          )
        }
        )}
      </div>
    </div>
  )
}

export default Itineraries
