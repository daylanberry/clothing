import React, { useEffect } from 'react'
import MenuItem from '../menu-item/MenuItem.jsx'
import ChatIcon from '../chat-components/ChatIcon.jsx'
import './Directory.scss'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { directorySections } from '../../redux/directory/directory.selector'
import { toggleHidden } from '../../redux/chat/chat.actions'

const Directory = ({directory, toggleHidden, user}) => {

  return (
  <div className='directory-container'>
    <div className='directory-menu'>
      {
        directory.map(({id, ...otherProps}) => (
          <MenuItem key={id} {...otherProps}/>
        ))
      }
    </div>
    <ChatIcon />
  </div>
)}



const mapStateToProps = createStructuredSelector({
  directory: directorySections
})

const mapDispatchToProps = dispatch => ({
  toggleHidden: () => dispatch(toggleHidden())
})

export default connect(mapStateToProps, mapDispatchToProps)(Directory)
