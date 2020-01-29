import React from 'react';
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

import { setCurrentUser } from './redux/user/user.actions.js'
import { selectCurrentUser } from './redux/user/user.selector.js'


class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {

    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        })

      }
      setCurrentUser(userAuth);

    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }


  render() {

    return (
      <div >
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={Checkout}/>
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignUp />)} />
        </Switch>
      </div>
    );
  }
}

//
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})


const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
