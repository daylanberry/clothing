import React from 'react'
import MenuItem from '../menu-item/MenuItem.jsx'
import './Directory.scss'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { directorySections } from '../../redux/directory/directory.selector'

const Directory = ({directory}) => (
  <div className='directory-menu'>
    {
      directory.map(({id, ...otherProps}) => (
        <MenuItem key={id} {...otherProps}/>
      ))
    }
  </div>
)



const mapStateToProps = createStructuredSelector({
  directory: directorySections
})

export default connect(mapStateToProps, null)(Directory)
