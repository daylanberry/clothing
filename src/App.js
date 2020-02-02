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

import { selectCurrentUser } from './redux/user/user.selector.js'
import { checkUserSession } from './redux/user/user.actions'


class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {

    const { checkUserSession } = this.props
    checkUserSession()

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //           id: snapShot.id,
    //           ...snapShot.data()
    //       })
    //     })

    //   }
    //setCurrentUser(userAuth);

    //})
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


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
