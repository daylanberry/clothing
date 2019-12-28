import { combineReducers } from 'redux'

import userReducer from '../redux/root-reducer.js'


export default combineReducers({
  user: userReducer
})