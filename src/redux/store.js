import { createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import persistReducer from './root-reducer.js'
import { persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}


export const store = createStore(persistReducer, applyMiddleware(...middlewares))

export const persistor = persistStore(store)

export default { store, persistor }