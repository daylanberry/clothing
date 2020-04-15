const users = [];
const rooms = {
  "General": [],
  "Men's Hats": [],
  "Men's Shirts": [],
  "Men's Shoes": [],
  "Women's Hat's": [],
  "Women's Tops": [],
  "Women's Shoes": []
}

const addUser = ({ id, name, room }) => {

  const userObj = {
    error: '',
    user: {}
  }

  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()

  const existingUser = users.find(user => {
    return user.room === room && user.name === name
  })

  if (existingUser) {
    userObj['error'] = 'Username is taken'
    return userObj
  }

  const user = { id, name, room }
  userObj['user'] = user
  users.push(user)

  return userObj
}

const removeUser = ({ id }) => {
  const index = users.findIndex(user => user.id === id)

  if (index) {
    return users.splice(index, 1)[0];
  }
}

const getUser = (id) => {
  return users.find(user => user.id === id)
}

const getUsersInRoom = (room) => {
  return users.filter(user => user.room === room)
}

const addMessage = (text, room) => {

  rooms[room].push(text)

  return rooms[room]
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom, addMessage, rooms }