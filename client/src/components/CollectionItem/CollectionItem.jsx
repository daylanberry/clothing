import React from 'react'

import { connect } from 'react-redux'
import { addItem } from '../../redux/cart/cart.actions'

import './CollectionItem.scss'
import { withRouter, Route } from 'react-router-dom'

import CustomButton from '../custom-button/CustomButton.jsx'

const CollectionItem = ({item, addItem}) => {
  const { imageUrl, name, price, id} = item
  return (
  <div className='collection-item'>
    <div
      className='image'
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className='collection-footer'>
      <span className='name'>{name}</span>
      <span className='price'>{price}</span>
    </div>
    <CustomButton className='custom-button' onClick={() => addItem(item)}  inverted>Add to Cart</CustomButton>
  </div>
  )

}

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item))
})

export default withRouter(connect(null, mapDispatchToProps)(CollectionItem));