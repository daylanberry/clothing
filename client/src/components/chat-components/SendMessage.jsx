import React, { useState } from 'react'
import { ReactComponent as Send } from '../../assets/send.svg'
import './SendMessage.scss'

const SendMessage = ({send}) => {

  const [message, setMessage] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    send(message)
    setMessage('')

  }

    return (
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <input
            placeholder='Chat!'
            className='enter-text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Send className='send-message' onClick={handleSubmit}/>
        </form>
      </div>
    )
}

export default SendMessage