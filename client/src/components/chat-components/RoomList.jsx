import React from 'react'
import './RoomList.scss'

const RoomList = ({currentRoom, rooms, changeRooms}) => {

  return (
    <div className='room-container'>
      <h3>Rooms</h3>
      <ul>
        {
          rooms.map((room, i) => {
            return (
              <li className={'room'} key={i}>
                <a
                onClick={() => {
                  changeRooms(room)
                }}
                className={room === currentRoom ? 'room active':'room'}>#{room}</a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )

}

export default RoomList