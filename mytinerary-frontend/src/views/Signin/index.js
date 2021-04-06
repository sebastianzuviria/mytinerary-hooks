import { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginServices from '../../services/login'
import { setUser } from '../../reducers/userReducer'
import { useHistory } from 'react-router-dom'
import itineraryServices from '../../services/itineraries'

const Signin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogin = async (e) => {
        e.preventDefault()
        
        try {
            const user = await loginServices.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedMytineraryUser', JSON.stringify(user)
            )
            itineraryServices.setToken(user.token)
            dispatch(setUser(user))
            history.push('/')
        } catch (exception) {
            console.log(exception)
        }
    }

    return (
        <div>
            <div>SignIn</div>
            <form onSubmit={handleLogin}>
                <div>username
                    <input 
                        type='text'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>password
                    <input 
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div> 
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default Signin