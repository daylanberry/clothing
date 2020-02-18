import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { womensOptions, mensOptions } from '../../redux/gender-options/gender-option.selector'
import GenderOptions from '../gender-options/GenderOptions'
import './ShopGender.scss'

const ShopGender = ({ womensOptions, mensOptions, match }) => {

  const options = match.path.includes('womens') ? womensOptions : mensOptions

  return (
    <div className='option'>
      {
        options.map(({id, ...otherProps}) =>
          <GenderOptions key={id} {...otherProps} />
        )
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  womensOptions,
  mensOptions
})

export default connect(mapStateToProps, null)(ShopGender)