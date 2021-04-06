import { useState, useEffect } from 'react'
import userServices from '../../services/users'
import cityServices from '../../services/cities'
import Itinerary from '../../components/Itinerary/index'

const Favourites = ({ user }) => {
    const [favs, setFavs] = useState([])

    const getFavs = async (id) => {
        const userData = await userServices.getFavs(user.id)
        setFavs(userData.favs)
    }

    console.log(favs)
    const getCity = async (cityId) => {
        const city = await cityServices.getCity(cityId)
        return city.name
    }

    useEffect(() => {
        if(user){
        getFavs(user.id)
        }
    }, [user]) //eslint-disable-line



    return (
        <div>
            <div> My favourites itineraries </div>
            <div>
                {favs.map(i => {
                    const city = getCity(i.city)
                    return (
                        <div key={i.id}>
                            fav
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Favourites