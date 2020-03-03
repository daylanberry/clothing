import React from 'react'
import './Chat.scss'
import { connect } from 'react-redux'
import { toggleChatModal } from '../../redux/chat/chat.actions'
import { ChatManager, TokenProvider} from '@pusher/chatkit-client'

import SendMessage from './SendMessage'
import MessageList from './MessageList'
import RoomList from './RoomList'

import keys from '../../keys.js'
import axios from 'axios'


class Chat extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      currentUser: {},
      joinableRooms: [],
      joinedRooms: [],
      roomId: null,
      userId: ''
    }
  }

  componentDidMount() {

    const { displayName } = this.props.user

    const chatManager = new ChatManager({
      instanceLocator: keys.instanceLocator,
      userId: displayName,
      tokenProvider: new TokenProvider({url: keys.tokenUrl})
    })

    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser
      this.getRooms()
    })
    .catch(err => console.log(err))
  }


  sendMessage = (text) => {
    if (this.state.roomId) {
      this.currentUser.sendSimpleMessage({
        text,
        roomId: this.state.roomId,
      })
    }
  }

  getRooms = () => {
  this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
        joinableRooms,
        currentUser: this.currentUser,
        joinedRooms: this.currentUser.rooms
      })
    })
    .catch(err => console.log(err))
  }

  subscribeToRoom = (roomId) =>{
    this.setState({messages: []})
    this.currentUser.subscribeToRoom({
      roomId: roomId,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
    })
    .then(room => {
      this.setState({
        roomId: room.id
      })
    })
    .catch(err => console.log(err))

  }


  render() {
    return (
      <div className='container'>
        <div className='chat-container'>
          <div className='content'>
            <aside className='rooms'>
              <RoomList
                rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                subscribeToRoom={this.subscribeToRoom}
                roomId={this.state.roomId}
              />
            </aside>

            <section className='texts'>
              <MessageList messages={this.state.messages} name={this.state.currentUser.id}/>
            </section>
            <span onClick={() => this.props.toggleHidden()}>&#10005;</span>
          </div>
        <div className='send-message'>
          <SendMessage send={this.sendMessage}/>
        </div>
        </div>

      </div>

    )
  }
}

const mapDispatchToProps = dispatch => ({
  toggleHidden: () => dispatch(toggleChatModal())
})


export default connect(null, mapDispatchToProps)(Chat)