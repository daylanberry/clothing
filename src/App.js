import React from 'react';
import {Switch, Route, Link} from 'react-router-dom'
import './App.css';

import HomePage from './pages/homepage/Homepage.jsx'
import ShopPage from './pages/shop/ShopPage.jsx'
import SignInSignUp from './pages/SignIn-SignUp/SignIn-SignUp.js'
import Header from './components/header/Header.jsx';

import { auth, createUserProfileDocument } from './firebase/firebase.utils'



class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })

          console.log(this.state)

        })
      } else {
        this.setState({
          currentUser: userAuth
        })
      }

    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }


  render() {

    return (
      <div >
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInSignUp} />
        </Switch>
      </div>
    );
  }

}

export default App;
