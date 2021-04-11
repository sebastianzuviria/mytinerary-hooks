import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import './App.css'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import Home from './views/Home/index'
import About from './views/About/index'
import Cities from './views/Cities/index'
import Signin from './views/Signin/index'
import Signup from './views/Signup/index'
import Itineraries from './views/Itineraries/index'
import Favourites from './views/Favourites/index'
import itineraryServices from './services/itineraries'
import commentServices from './services/comments'
import NavBar from './components/NavBar/index'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedMytineraryUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      itineraryServices.setToken(user.token)
      commentServices.setToken(user.token)
      dispatch(setUser(user))
    }
  }, []) //eslint-disable-line
  

  return (
    <Router>
       
      <div className="App">
      <NavBar />
      <div>
        <Switch>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/signin'>
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
        </div>
        </div>   
    </Router>
  )
}


export default App;
