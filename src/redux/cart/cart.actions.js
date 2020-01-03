import CartActionTypes from './cart.types.js'

export const toggleCartHidden = (state) => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
})

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
})