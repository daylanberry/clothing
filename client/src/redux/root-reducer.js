import { combineReducers } from 'redux'

import userReducer from '../redux/user/user.reducer.js'
import directoryReducer from './directory/directory.reducer'
import cartReducer from './cart/cart.reducer.js'
import shopReducer from './shop/shop.reducer'
import genderOptionReducer from './gender-options/gender-option.reducer'
import chatReducer from './chat/chat.reducer'

import { persistReducer } from 'redux-persist'


//saying we want to use local storage as default
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}



const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
  genderOptions: genderOptionReducer,
  chat: chatReducer
})


export default persistReducer(persistConfig, rootReducer)

