import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../reducers/userReducer'
import { ReactComponent as MenuIcon } from './assets/menu.svg'
import './index.css'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import itineraryServices from '../../services/itineraries'
import loginServices from '../../services/login'
import commentServices from '../../services/comments'

const NavBar = () => {
  const [click, setClick] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const history = useHistory()

  const handleClick = () => setClick(!click)

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
    setClick(false)
  }

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
      setClick(!click)
    } catch (exception) {
      console.log(exception)
    }
  }

  const errorGoogle = (response) => {
    console.log(response.profileObj)
  }

  return (
    <div className='Header'>
      <div className='LeftNav'>
        <div className={click ? 'NavOptionsLeft Active' : 'NavOptionsLeft'}>
          <Link className='Option' onClick={handleClick} to='/'>Home</Link>
          <Link className='Option' onClick={handleClick} to='/about'>About</Link>
          <Link className='Option' onClick={handleClick} to='/cities'>Cities</Link>
          {user && <Link className='Option' onClick={handleClick} to='/favourites'>Favourites</Link>}
          {/* {!user && <Link className="Option MobileOption" onClick={handleClick} to='/signin'>Singin</Link>} */}
          {!user && <GoogleLogin
            clientId='513500461810-5n00tpak7tr7lti6an6lau1mm8sfnaqj.apps.googleusercontent.com'
            buttonText='Login'
            render={renderProps => (
              <Link className='Option MobileOption' onClick={renderProps.onClick} disabled={renderProps.disabled} to='/cities'>
                Login
              </Link>
            )}
            onSuccess={handleLoginGoogle}
            onFailure={errorGoogle}
            cookiePolicy='single_host_origin'
            isSignedIn
                    />}
          {/* {!user && <Link className="Option MobileOption" onClick={handleClick} to='/signup'>Singup</Link>} */}
          {/* {user && <Link className="Option MobileOption" to='/' onClick={handleLogout}>Logout</Link>} */}
          {user && <GoogleLogout
            clientId='658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
            buttonText='Logout'
            render={renderProps => (
              <Link className='Option MobileOption' onClick={renderProps.onClick} disabled={renderProps.disabled} to='/'>
                Logout
              </Link>
            )}
            onLogoutSuccess={handleLogout}
            isSignedIn={false}
                   />}
        </div>
      </div>
      <div className='RightNav'>
        <div className='NavOptionsRight'>
          {!user && <GoogleLogin
            clientId='513500461810-5n00tpak7tr7lti6an6lau1mm8sfnaqj.apps.googleusercontent.com'
            buttonText='Login'
            render={renderProps => (
              <Link className='Option' onClick={renderProps.onClick} disabled={renderProps.disabled} to='/cities'>
                Login
              </Link>
            )}
            onSuccess={handleLoginGoogle}
            onFailure={errorGoogle}
            cookiePolicy='single_host_origin'
            isSignedIn
                    />}
          {/* {!user && <Link className="Option" to='/signin'>Singin</Link>} */}
          {/* {!user && <Link className="Option" to='/signup'>Singup</Link>} */}
          {/* {user && <Link className="OptionRight" to='/' onClick={handleLogout}>Logout</Link>} */}
          {user && <GoogleLogout
            clientId='658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
            render={renderProps => (
              <Link className='OptionRight' onClick={renderProps.onClick} disabled={renderProps.disabled} to='/'>
                Logout
              </Link>
            )}
            onLogoutSuccess={handleLogout}
            isSignedIn={false}
                   />}
        </div>
      </div>
      <div className='MobileMenu' onClick={handleClick}>
        {click ? (
          <MenuIcon className='MenuIcon' />
        ) : (
          <MenuIcon className='MenuIcon' />
        )}
      </div>
    </div>
  )
}

export default NavBar
