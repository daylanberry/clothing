import React from 'react';
import {Switch, Route, Link} from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/Homepage.jsx'
import ShopPage from './pages/shop/ShopPage.jsx'
import Header from './components/header/Header.jsx'



function App() {
  return (
    <div >
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
