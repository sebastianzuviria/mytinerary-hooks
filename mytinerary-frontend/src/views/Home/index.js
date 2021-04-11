import './index.css'
import { Link } from 'react-router-dom'
import travelIcon from '../../images/travel.png'
import musicIcon from '../../images/music.png'
import cutleryIcon from '../../images/cutlery.png'
import beachIcon from '../../images/beach.png'

const Home = () => {

    return (
        <div className="Home">
            <div className="Icons">
                <img src={travelIcon} className="Plane" alt="plane"/>
                <img src={musicIcon} className="Music" alt="music"/>
                <img src={cutleryIcon} className="Cutlery" alt="cutlery"/>
                <img src={beachIcon} className="Beach" alt="beach"/>
            </div>
            <div className="Content">  
                <h1 className="HeaderContent">
                    Welcome to Mytinerary
                </h1>
                <div className="BodyContent">
                    Choose your favourites places, and discover the World.
                </div>
                <Link className="ButtonStart" to='/cities'>
                    Get Started
                </Link>
            </div>
        </div>
    )
}

export default Home