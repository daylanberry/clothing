import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { auth } from  '../../firebase/firebase.utils'

import { ReactComponent as Logo } from '../../assets/crown.svg'

import CartIcon from '../cart-icon/CartIcon.jsx'
import CartDropdown from '../cart-dropdown/CartDropdown.jsx'

import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selector'

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from './Header.styles'
import { signOutStart } from '../../redux/user/user.actions'

import './Header.scss'


const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>
        SHOP
      </OptionLink>
      <OptionLink as='p' to='/shop'>
        CONTACT
      </OptionLink>
      {
        currentUser ?
        <OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink>
        :
        <OptionLink to='/signin'>SIGN IN</OptionLink>
      }
      <CartIcon />
    </OptionsContainer>
    {
      hidden ? null : <CartDropdown />
    }
  </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);