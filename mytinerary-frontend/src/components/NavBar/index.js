import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../reducers/userReducer'
import { ReactComponent as MenuIcon } from './assets/menu.svg'
import './index.css'


const NavBar = () => {
    const [click, setClick] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleClick = () => setClick(!click)

    const handleLogout = () => {
        window.localStorage.clear()
        dispatch(setUser(null))
        setClick(false)
      }
      
    return (
        <div className="Header">
        <div className="LeftNav">
          <div className={click ? "NavOptionsLeft Active" : "NavOptionsLeft"}>
            <Link className="Option" onClick={handleClick} to='/'>Home</Link>
            <Link className="Option" onClick={handleClick} to='/about'>About</Link>
            <Link className="Option" onClick={handleClick} to='/cities'>Cities</Link>
            {user && <Link className="Option" onClick={handleClick} to='/favourites'>Favourites</Link>}
            {!user && <Link className="Option MobileOption" onClick={handleClick} to='/signin'>Singin</Link>}
            {!user && <Link className="Option MobileOption" onClick={handleClick} to='/signup'>Singup</Link>}
            {user && <Link className="Option MobileOption" to='/' onClick={handleLogout}>Logout</Link>}
          </div>
        </div>
        <div className="RightNav">
          <div className="NavOptionsRight">
          {!user && <Link className="Option" to='/singin'>Singin</Link>}
          {!user && <Link className="Option" to='/singup'>Singup</Link>}
          {user && <Link className="OptionRight" to='/' onClick={handleLogout}>Logout</Link>}
          </div>
        </div>
        <div className="MobileMenu" onClick={handleClick}>
        {click ? (
          <MenuIcon className="MenuIcon"/>
        ) : (
          <MenuIcon className="MenuIcon" />
        )}
      </div>
      </div>
    )
}

export default NavBar