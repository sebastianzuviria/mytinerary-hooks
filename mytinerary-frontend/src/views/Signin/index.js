import { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginServices from '../../services/login'
import { setUser } from '../../reducers/userReducer'
import { useHistory } from 'react-router-dom'
import itineraryServices from '../../services/itineraries'
import commentServices from '../../services/comments'
import { GoogleLogin } from 'react-google-login'

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    // const handleLogin = async (e) => {
    //     e.preventDefault()
        
    //     try {
    //         const user = await loginServices.login({
    //             email, password
    //         })
    //         window.localStorage.setItem(
    //             'loggedMytineraryUser', JSON.stringify(user)
    //         )
    //         itineraryServices.setToken(user.token)
    //         commentServices.setToken(user.token)
    //         dispatch(setUser(user))
    //         history.push('/')
    //     } catch (exception) {
    //         console.log(exception)
    //     }
    // }

    const handleLoginGoogle = async googleData => {
        console.log(googleData)
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
        console.log(response.profileObj);
    }

    return (
        <div>
            <div>SignIn</div>
            <form onSubmit={handleLogin}>
                <div>Email
                    <input 
                        type='email'
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </div>
                <div>Password
                    <input 
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div> 
                <button type='submit'>login</button>
                <GoogleLogin
                    clientId="513500461810-5n00tpak7tr7lti6an6lau1mm8sfnaqj.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={handleLoginGoogle}
                    onFailure={errorGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </form>
        </div>
    )
}

export default Signin