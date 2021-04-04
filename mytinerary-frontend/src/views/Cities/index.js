import { useEffect } from 'react'
import { getCities } from '../../reducers/cityReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const styles = {
    link: {
        margin: 5
    }
}
 
const Cities = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
       dispatch(getCities())
    }, [dispatch])

    const cities = useSelector(state => state.cities)

    return (
        <div>
            <div>Cities</div>
            {cities.map(city => {
                return (
                    <Link style={styles.link} key={city.id} to={`/itineraries/${city.name}`}>{city.name}</Link>
                )
            })}
        </div>
    )
}

export default Cities