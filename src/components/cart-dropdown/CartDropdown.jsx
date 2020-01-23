import React from 'react'
import { connect } from 'react-redux'

import CustomButton from '../custom-button/CustomButton.jsx'
import CartItem from '../cart-item/CartItem.jsx'
import { withRouter } from 'react-router-dom'

import { createStructuredSelector } from 'reselect'

import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import './CartDropdown.scss'

const CartDropdown = ({cartItems, history, dispatch}) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
    {
      cartItems.length ?
      cartItems.map(item =>
      <CartItem key={item.id} item={item}/>
    )
    :
    <span className='empty-message'>Your cart is empty</span>
    }

    </div>
    <CustomButton onClick={() => {
      history.push('/checkout');
      dispatch(toggleCartHidden())
    }}>GO TO CHECKOUT</CustomButton>

  </div>
)

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));