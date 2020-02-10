import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

//Provider is parent of everything inside of application
//allows us to get access to everything related to store
import { Provider } from 'react-redux';

import { store, persistor } from './redux/store.js';

import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker'


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      < PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

  serviceWorker.register()


//this gives anything between the Browser Router (App), all the functionality of routing.