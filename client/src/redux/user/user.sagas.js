import { takeLatest, put, all, call } from 'redux-saga/effects'
import { googleSignInFailure, signInSuccess, signInFailure, signOutSuccess, signOutFailure, signupSuccess, signupFailure } from './user.actions'
import userActionTypes from './user.types'

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'

import axios from 'axios'
import { ChatManager, TokenProvider} from '@pusher/chatkit-client'

const createUser = (user) => {
  axios.post('/users', {
    username: user
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
}


function* getSnapshopFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData)
    const snapshot = yield userRef.get()
    const displayName = snapshot.data().displayName
    yield createUser(displayName)

    yield put(signInSuccess({id: snapshot.id, ...snapshot.data()}))
  } catch(error) {
    yield put(signInFailure(error))
  }
}

function* signInWithGoogle() {
  try {
    const {user} = yield auth.signInWithPopup(googleProvider)
    yield getSnapshopFromUserAuth(user)

  } catch(error) {
    yield put(signInFailure(error))
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}


export function* signInWithEmail({payload: {email, password}}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password)
    yield getSnapshopFromUserAuth(user)
  } catch(error) {
    yield put(signInFailure(error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser()
    if (!userAuth) return;
    yield getSnapshopFromUserAuth(userAuth)


  } catch(error) {
    yield put(signInFailure(error))
  }
}

export function* signOut() {
  try {
    yield auth.signOut()
    yield put(signOutSuccess())
  } catch(error) {
    yield put(signOutFailure(error))
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START,
    signInWithEmail)
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}


export function* onUserSignupStart({payload: {displayName, email, password }}) {

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password)
    yield put(signupSuccess({user, additionalData: {displayName}}))

  } catch(error) {
    yield put(signupFailure(error))
  }
}

export function* signInAfterSignup({payload: { user, additionalData }}) {
  yield getSnapshopFromUserAuth(user, additionalData)
}

export function* onSignupSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignup)
}


export function* signupStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, onUserSignupStart)
}


export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(signOutUser),
    call(signupStart),
    call(onSignupSuccess)
  ])
}
