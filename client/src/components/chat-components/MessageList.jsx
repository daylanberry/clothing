import React from 'react'
import './MessageList.scss'


const MessageList = ({messages, currentUser}) => {
  return (
    <div className='container'>
      <h3>Messages</h3>
      <ul className='list'>
        {
          messages.map((message, i) => {
            const messageName = message.name;
            const userCheck = messageName === currentUser

            return (
            <li className='list-obj' key={i}>
              <div className={userCheck ? 'self' : 'other-user'}>
                <span >
                  {messageName}
                </span>
              </div>
              <div>
              <p className={userCheck ? 'message' : 'other'}>{message.text}</p>
              </div>
            </li>
          )})
        }
      </ul>
    </div>
  )

}

export default MessageList