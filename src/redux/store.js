import { createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'

import persistReducer from './root-reducer.js'
import { persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const middlewares = [logger]


export const store = createStore(persistReducer, applyMiddleware(...middlewares))

export const persistor = persistStore(store)

export default { store, persistor }