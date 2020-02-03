import React, { useEffect } from 'react';
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import './App.css';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import HomePage from './pages/homepage/Homepage.jsx'
import ShopPage from './pages/shop/ShopPage.jsx'
import Checkout from './pages/checkout/Checkout'
import SignInSignUp from './pages/SignIn-SignUp/SignIn-SignUp.js'
import Header from './components/header/Header.jsx';

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

import { selectCurrentUser } from './redux/user/user.selector.js'
import { checkUserSession } from './redux/user/user.actions'


const App = ({checkUserSession, currentUser}) => {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <div >
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={Checkout}/>
        <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SignInSignUp />)} />
      </Switch>
    </div>
  );
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
