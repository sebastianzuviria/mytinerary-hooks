import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Home from './views/Home/index.js'
import About from './views/About/index.js'
import Signin from './views/Signin/index.js'
import Signup from './views/Signup/index.js'


const App = () => {
  const styles = {
    navBar: {
      backgroundColor: 'black',
      
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

  return (
    <Router>
      <div style={styles.navBar}>
        <Link style={styles.buttonNav} to='/'>Home</Link>
        <Link style={styles.buttonNav} to='/about'>About</Link>
        <Link style={styles.buttonNav} to='/singin'>Singin</Link>
        <Link style={styles.buttonNav} to='/singup'>Singup</Link>
      </div>
      <div style={styles.title}>MYitinerary</div>
        <Switch>
          <Route path='/singup'>
            <Signup />
          </Route>
          <Route path='/singin'>
            <Signin />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>  
    </Router>
  )
}


export default App;
