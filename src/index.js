import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

//Provider is parent of everything inside of application
//allows us to get access to everything related to store
import { Provider } from 'react-redux';

import store from './redux/store.js';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));


//this gives anything between the Browser Router (App), all the functionality of routing.