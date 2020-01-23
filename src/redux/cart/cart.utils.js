export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(item => item.id === cartItemToAdd.id)

  if (existingCartItem) {
    return cartItems.map(item =>
      item.id === cartItemToAdd.id
      ? {...item, quantity: item.quantity + 1}
      : item
    )
  }

  return [...cartItems, {...cartItemToAdd, quantity: 1} ]

}

export const removeItemFromCart = (cartItems, toRemove) => {
  var existing = cartItems.find(item =>
    item.id === toRemove.id
  )

  if (existing.quantity === 1) {
    return cartItems.filter(item =>
      item.id !== toRemove.id)
  }

  return cartItems.map(item =>
    item.id === toRemove.id ?
    {...item, quantity: item.quantity - 1}
    : item
  )
}
