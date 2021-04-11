import { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginServices from '../../services/login'
import { setUser } from '../../reducers/userReducer'
import { useHistory } from 'react-router-dom'
import itineraryServices from '../../services/itineraries'
import commentServices from '../../services/comments'

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogin = async (e) => {
        e.preventDefault()
        
        try {
            const user = await loginServices.login({
                email, password
            })
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
            </form>
        </div>
    )
}

export default Signin