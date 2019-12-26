import firebase from 'firebase/app'
//database
import 'firebase/firestore';
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyAkfCustv-z8X9hmSE8oJFydk4aEq_pi2A",
  authDomain: "trans-array-253223.firebaseapp.com",
  databaseURL: "https://trans-array-253223.firebaseio.com",
  projectId: "trans-array-253223",
  storageBucket: "trans-array-253223.appspot.com",
  messagingSenderId: "647533815474",
  appId: "1:647533815474:web:da183ff54e071691b8cbab",
  measurementId: "G-RP7PEME805"
}

firebase.initializeApp(config)

//have access to this do to import auth
export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider();

//want to always trigger google popup whenever we use google auth provider
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;