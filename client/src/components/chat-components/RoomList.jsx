import React from 'react'
import './RoomList.scss'

class RoomList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      roomId: ''
    }
  }


  render() {

    const orderedRooms = [...this.props.rooms].sort((a, b) => parseInt(a.createdAt) - parseInt(b.createdAt))
    console.log(orderedRooms)

    return (
      <div className='room-container'>
        <h3>Rooms</h3>
        <ul>
          {
            orderedRooms.map(room => {
              const active = room.id === this.state.roomId ? 'active' : ''

              return (
                <li className={'room ' + active} key={room.id}>
                  <a
                  onClick={() => {
                    this.props.subscribeToRoom(room.id)
                    this.setState({
                      roomId: room.id
                    }, () => console.log(this.state))
                  }}
                  className={'room ' + active}>#{room.name}</a>
                </li>
              )
            })
          }

        </ul>
      </div>
    )
  }
}

export default RoomList