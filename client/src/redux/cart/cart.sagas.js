import { all, call, takeLatest, put, select } from 'redux-saga/effects'
import { firestore, getCurrentUser, getUserCartRef } from '../../firebase/firebase.utils'
import { selectCartItems } from './cart.selectors'
import { selectCurrentUser } from '../user/user.selector'
import UserActionTypes from '../user/user.types'
import CartActionTypes from './cart.types'
import { clearCart, itemFailure, setCartFromFirebase } from './cart.actions'


export function* clearCartOnSignOut() {
  yield put(clearCart())
}

export function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser)
  if (currentUser) {
    try {
      const cartRef = yield getUserCartRef(currentUser.id)
      const cartItems = yield select(selectCartItems)
      yield cartRef.update({cartItems})

    } catch(error) {
      console.log(error)
    }
  }
}

export function* checkCartFromFirebase({payload: user}) {
  const cartRef = yield getUserCartRef(user.id)
  const snapshot = yield cartRef.get()
  const cartItems = yield snapshot.data().cartItems
  yield put(setCartFromFirebase(cartItems))
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* onUserSignIn() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase)
}

export function* onCartChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM_FROM_CART
    ],
    updateCartInFirebase
  )
}



export function* cartSagas() {
  yield all([
    call(onCartChange),
    call(onSignOutSuccess),
    call(onUserSignIn)

  ])
}