import { createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'

import rootReduer from './root-reducer.js'

const middlewares = [logger]

const store = createStore(rootReduer, applyMiddleware(...middlewares))

export default store