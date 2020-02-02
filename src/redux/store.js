import { createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import persistReducer from './root-reducer.js'
import { persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootSaga from './root-saga'

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}


export const store = createStore(persistReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default { store, persistor }