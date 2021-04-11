import './index.css'
import { Link } from 'react-router-dom'

const City = ({
    cityName,
    cityImg,
    countryName,
    countryFlag
}) => {

    const capitalizeString = (string) => {
        return string.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
    }

    return (
        <div className="Card">
            <Link to={`/itineraries/${cityName}`}>
                <div className="CityImg" style={{ backgroundImage: `url(${cityImg})`}}></div>
                <div className="CityName">{capitalizeString(cityName)}</div>
                <div className="CountryName">{capitalizeString(countryName)}</div>
                <div className="FlagContainer">
                    <div className="CountryFlag" style={{ backgroundImage: `url(${countryFlag})`}}></div>
                </div>
            </Link>
        </div> 
    )
}

export default City