import React, {useEffect} from 'react'
import './ChatIcon.scss'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { ReactComponent as Chatsvg } from '../../assets/chat.svg'
import Chat from './Chat.jsx'

import { selectCurrentUser } from '../../redux/user/user.selector'

import { chatHidden } from '../../redux/chat/chat.selectors'
import { toggleChatModal } from '../../redux/chat/chat.actions'

const ChatIcon = ({displayName, hidden, toggleHidden, user}) => {

  return (
    <div >
      {
        hidden && !user ?
        <Chatsvg className='chat' onClick={() => alert('Need to sign in to enable chat')} />
        :
        hidden ?
          <Chatsvg className='chat' onClick={() => toggleHidden()}/>
        :
        <Chat user={user}/>
      }
    </div>
  )

}

const mapStateToProps = createStructuredSelector({
  displayName: selectCurrentUser,
  hidden: chatHidden,
  user: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  toggleHidden: () => dispatch(toggleChatModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatIcon)