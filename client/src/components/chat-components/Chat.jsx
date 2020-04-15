import React, { useEffect, useState } from 'react'
import './Chat.scss'
import { connect } from 'react-redux'
import { toggleChatModal } from '../../redux/chat/chat.actions'

import SendMessage from './SendMessage'
import MessageList from './MessageList'
import RoomList from './RoomList'

import socketIOClient from 'socket.io-client'
import axios from 'axios'

var socket;
const ENDPOINT = process.env.NODE_ENV === 'development' ? 'ws://localhost:5002' : 'ws://dayclothing.herokuapp.com/'


const Chat = ({toggleHidden, user}) => {

    const [messages, setMessages] = useState([])
    const [currentUser, setCurrentUser] = useState('')
    const [joinedRooms, setJoinedRooms] = useState(["General", "Men's Hats", "Men's Shirts", "Men's Shoes", "Women's Hat's", "Women's Tops", "Women's Shoes"])
    const [room, setRoom] = useState('General')

    useEffect(() => {
      var { displayName } = user

      if (!displayName) {
        displayName = user.email
      }

      socket = socketIOClient('/')

      socket.emit('join', { user: displayName, room })
      setCurrentUser(displayName)

      socket.on('updateMessages', (messages) => {
        setMessages(messages)
      })

      return () => {
        socket.emit('disconnect')
        socket.off()
      }

    }, [ENDPOINT])



    useEffect(() => {

      socket.on(room, (messages) => {
        setMessages(messages)
      })

      socket.on('updateMessages', (messages) => {
        setMessages(messages)
      })

    }, [messages, room, socket])



  const changeRooms = (room) => {
    setRoom(room)
    socket.emit('join', { user, room })

  }


  const sendMessage = (text) => {
    const newMessage = {
      id: socket.id,
      text: text,
      name: user.displayName || user.email
    }
    setMessages(messages.concat(newMessage))
    socket.emit('sendMessageToServer', { newMessage, room })

  }

    return (
      <div className='container'>
        <div className='chat-container'>
          <div className='content'>
            <aside className='rooms'>
              <RoomList
                rooms={joinedRooms}
                currentRoom={room}
                changeRooms={changeRooms}
              />
            </aside>

            <section className='texts'>
              <MessageList
                messages={messages}
                currentUser={currentUser}
              />
            </section>
            <span className='exit' onClick={toggleHidden}>&#10005;</span>
          </div>
          <div className='send-message'>
            <SendMessage send={sendMessage} />
          </div>
        </div>

      </div>

    )

}


const mapDispatchToProps = dispatch => ({
  toggleHidden: () => dispatch(toggleChatModal())
})

export default connect(null, mapDispatchToProps)(Chat)