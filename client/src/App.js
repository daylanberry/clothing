import React, { useEffect, lazy, Suspense } from 'react';
import {Switch, Route, Link, Redirect} from 'react-router-dom'

import { GlobalStyle } from './global.styles'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Spinner from './components/spinner/spinner.component'
import Header from './components/header/Header.jsx';
import ErrorBoundary from './components/error-boundary/error-boundary.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

import { selectCurrentUser } from './redux/user/user.selector.js'
import { checkUserSession } from './redux/user/user.actions'

const HomePage = lazy(() => import('./pages/homepage/Homepage.jsx'))
const ShopPage = lazy(() => import('./pages/shop/ShopPage.jsx'))
const SignInSignUp = lazy(() => import('./pages/SignIn-SignUp/SignIn-SignUp.js'))
const Checkout = lazy(() => import('./pages/checkout/Checkout'))

const App = ({checkUserSession, currentUser}) => {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <div >
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={Checkout}/>
          <Route exact path='/signin' render={() => currentUser ?   (<Redirect to='/' />) : (<SignInSignUp />)} />
          </Suspense>
        </ErrorBoundary>
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
