import React from 'react'
import { connect } from 'react-redux'

import CustomButton from '../custom-button/CustomButton.jsx'
import CartItem from '../cart-item/CartItem.jsx'

import { selectCartItems } from '../../redux/cart/cart.selectors'

import './CartDropdown.scss'

const CartDropdown = ({cartItems}) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        cartItems.map(item =>
          <CartItem key={item.id} item={item}/>
          )
      }

    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
)

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state)
})

export default connect(mapStateToProps)(CartDropdown);