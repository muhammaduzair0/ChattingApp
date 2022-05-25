import {createStore} from 'redux'
import AccountReducer from './Reducer/Account'

const rootReducer = (state,action) =>{
    return AccountReducer(state,action)
}

export const store = createStore(rootReducer)