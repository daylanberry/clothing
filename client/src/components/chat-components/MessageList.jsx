import React from 'react'
import './MessageList.scss'


const data = [
  {
    sender: 'day',
    message: 'hello'
  }, {
    sender: 'deedee',
    message: 'hi'
  },
  {
    sender: 'day',
    message: 'hello'
  }, {
    sender: 'deedee',
    message: 'hi'
  },
  {
    sender: 'day',
    message: 'hello'
  }, {
    sender: 'deedee',
    message: 'hi'
  }
]


class Messages extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }


  render() {

    return (
      <div className='container'>
        <h3>Messages</h3>
        <ul className='list'>
          {
            this.props.messages.map(message => {

              const username = message.senderId
              const userCheck = username === this.props.name

              return (
              <li className='list-obj'>
                <div className={userCheck ? 'self' : 'other-user'}>
                  <span >
                    {message.senderId}
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
}

export default Messages