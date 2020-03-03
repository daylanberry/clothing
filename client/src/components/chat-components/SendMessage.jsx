import React, { useState } from 'react'
import { ReactComponent as Send } from '../../assets/send.svg'
import './SendMessage.scss'

const SendMessage = ({send}) => {

  const [message, writeMessage] = useState('')

  const inputHandler = (e) => {
    writeMessage(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.length) send(message)
    writeMessage('')
  }

    return (
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <input
            placeholder='Chat!'
            onChange={inputHandler}
            value={message}
            className='enter-text'
          />
          <Send className='send-message' onClick={handleSubmit}/>
        </form>
      </div>
    )
}

export default SendMessage