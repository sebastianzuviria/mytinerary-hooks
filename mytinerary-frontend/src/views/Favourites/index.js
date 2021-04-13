import { useState, useEffect } from 'react'
import userServices from '../../services/users'
import Itinerary from '../../components/Itinerary'
import { Link } from 'react-router-dom'
import './index.css'

const Favourites = ({ user }) => {
  const [favs, setFavs] = useState([])

  const getFavs = async (id) => {
    const userData = await userServices.getFavs(id)
    setFavs(userData.favs)
  }

  useEffect(() => {
    if (user) {
      getFavs(user.id)
    }
  }, [user]) //eslint-disable-line

  return (
    <div className='Favourites'>
      {favs.length > 0
        ? <h3>My favourites itineraries</h3>
        : <div>You don\'t have itineraries added to favourites</div>}
      {favs.length === 0 &&
        <div>
          Go to <Link to='/cities'>Cities Page</Link> and start your itinerary
        </div>}
      <div>
        {favs.map(i => {
          const unFav = async () => {
            await userServices.unFav(user.id, i.id)
            getFavs(user.id)
          }
          return (
            <Itinerary
              key={i.id}
              functionFav={unFav}
              itineraryId={i.id}
              itineraryName={i.name}
              itineraryRating={i.rating}
              itineraryPrice={i.price}
              itineraryImage={i.imgUrl}
              itineraryHashtags={i.hashtags}
              itineraryActivities={i.activities}
              itineraryFavs={i.favs}
              itineraryComments={i.comments}
              city={i.city.name}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Favourites
