import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'


ReactDOM.render(<BrowserRouter>
<App />
</BrowserRouter>, document.getElementById('root'));


//this gives anything between the Browser Router (App), all the functionality of routing.