import './index.css'
import { useEffect } from 'react'
import { getCities } from '../../reducers/cityReducer'
import { clearItinerariesOf } from '../../reducers/itineraryReducer'
import { useSelector, useDispatch } from 'react-redux'
import City from '../../components/City/index'
 
const Cities = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
       dispatch(getCities())
       dispatch(clearItinerariesOf())
    }, [dispatch])

    const cities = useSelector(state => state.cities)

    return (
        <div className="Cities">
            <h3>Cities</h3>
            <div className="CitiesContainer" >
                {cities.map(city => {
                    return (
                        <City
                            key={city.id} 
                            cityName={city.name}
                            cityImg={city.imgUrl}
                            countryName={city.country.name}
                            countryFlag={city.country.flagImgUrl}
                        />                         
                    )
                })}
            </div>
        </div>
    )
}

export default Cities