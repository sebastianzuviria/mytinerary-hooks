import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import cityReducer from './reducers/cityReducer'
import itineraryReducer from './reducers/itineraryReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
    cities: cityReducer,
    itineraries: itineraryReducer,
    user: userReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store