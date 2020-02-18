import  { createSelector } from 'reselect'

//inputselector
const selectCart = (state) => state.cart;

//outputselector
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (acc, item) =>
        acc + item.quantity,
      0
    )
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((acc, current) =>
    acc + current.price * current.quantity,
    0
  )
);
