import { combineReducers } from 'redux'

import userReducer from '../redux/user/user.reducer.js'


export default combineReducers({
  user: userReducer
})