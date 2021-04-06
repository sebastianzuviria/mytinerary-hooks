import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import './App.css';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Home from './views/Home/index'
import About from './views/About/index'
import Cities from './views/Cities/index'
import Signin from './views/Signin/index'
import Signup from './views/Signup/index'
import Itineraries from './views/Itineraries/index'
import Favourites from './views/Favourites/index'
import itineraryServices from './services/itineraries'


const App = () => {
  const styles = {
    navBar: {
      backgroundColor: 'blue',
      height: 50,
      alignItems: 'center',
      display: 'flex'
    },
    buttonNav: {
      padding: 5,
      margin: 5,
      backgroundColor: 'grey',
      textDecoration: 'none',
      color: 'white'
    },
    title: {
      margin: 20,
      fontSize: 30
    }
  }

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedMytineraryUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      itineraryServices.setToken(user.token)
      dispatch(setUser(user))
    }
  }, []) //eslint-disable-line

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }
  

  return (
    <Router>
      <div style={styles.navBar}>
        <Link style={styles.buttonNav} to='/'>Home</Link>
        <Link style={styles.buttonNav} to='/about'>About</Link>
        <Link style={styles.buttonNav} to='/cities'>Cities</Link>
        {!user && <Link style={styles.buttonNav} to='/singin'>Singin</Link>}
        {!user && <Link style={styles.buttonNav} to='/singup'>Singup</Link>}
        {user && <Link style={styles.buttonNav} to='/favourites'>Favourites</Link>}
        {user && <button style={styles.buttonNav} onClick={handleLogout}>Logout</button>}
      </div>
      <div style={styles.title}>MYitinerary</div>
        <Switch>
          <Route path='/singup'>
            <Signup />
          </Route>
          <Route path='/singin'>
            <Signin />
          </Route>
          <Route path='/cities'>
            <Cities />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/favourites'>
            <Favourites user={user}/>
          </Route>
          <Route path='/itineraries/:city' component={Itineraries}/>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>  
    </Router>
  )
}


export default App;
