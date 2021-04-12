import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import travelIcon from '../../images/travel.png'
import musicIcon from '../../images/music.png'
import cutleryIcon from '../../images/cutlery.png'
import beachIcon from '../../images/beach.png'
import { GoogleLogin } from 'react-google-login'
import itineraryServices from '../../services/itineraries'
import loginServices from '../../services/login'
import commentServices from '../../services/comments'

import { setUser } from '../../reducers/userReducer'

const Home = () => {
  const user = useSelector(state => state.user)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLoginGoogle = async googleData => {
    try {
      const user = await loginServices.loginGoogle(googleData)
      window.localStorage.setItem(
        'loggedMytineraryUser', JSON.stringify(user)
      )
      itineraryServices.setToken(user.token)
      commentServices.setToken(user.token)
      dispatch(setUser(user))
      history.push('/')
    } catch (exception) {
      console.log(exception)
    }
  }

  const errorGoogle = (response) => {
    console.log(response)
  }

  return (
    <div className='Home'>
      <div className='Icons'>
        <img src={travelIcon} className='Plane' alt='plane' />
        <img src={musicIcon} className='Music' alt='music' />
        <img src={cutleryIcon} className='Cutlery' alt='cutlery' />
        <img src={beachIcon} className='Beach' alt='beach' />
      </div>
      <div className='Content'>
        <h1 className='HeaderContent'>
          Welcome to Mytinerary
        </h1>
        {user
          ? <div>
            <div className='BodyContent'>
              Choose your favourites places, and discover the World.
            </div>
            <Link className='ButtonStart' to='/cities'>
              Cities
            </Link>
            </div>
          : <div>
            <div className='BodyContent'>
              Login with Google and discover the World.
            </div>
            <GoogleLogin
              clientId='513500461810-5n00tpak7tr7lti6an6lau1mm8sfnaqj.apps.googleusercontent.com'
              buttonText='Login'
              render={renderProps => (
                <Link className='ButtonStart' onClick={renderProps.onClick} disabled={renderProps.disabled} to='/cities'>
                  Get Started
                </Link>
              )}
              onSuccess={handleLoginGoogle}
              onFailure={errorGoogle}
              cookiePolicy='single_host_origin'
              isSignedIn
            />
            {/* <Link className="ButtonStart" to='/signin'>
                        Get Started
                    </Link> */}
            </div>}
      </div>
    </div>
  )
}

export default Home
