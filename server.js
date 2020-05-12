const express = require('express');
const cors = require('cors')
const bodyParser =  require('body-parser')
const path = require('path');
const compression = require('compression')
const enforce = require('express-sslify')
const app = express();
require('dotenv').config()

const port = process.env.PORT || 5002
const socketio = require('socket.io')
const server = require('http').createServer(app)
const io = socketio(server)
const { addUser, removeUser, getUser, getUsersInRoom, addMessage, rooms } = require('./users.js')


if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(cors())
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Credentials', true);


  next();
})


if (process.env.NODE_ENV === 'production') {
  app.use(compression())
  app.use(enforce.HTTPS({ trustProtoHeader: true }))
  app.use(express.static(path.join(__dirname, 'client/build')));

  //for any route not covered in routes
  app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}


app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd',
  }

  stripe.charges.create(body, (err, result) => {
    if (err) {
      res.status(500).send({error: err})
    } else {
      res.status(200).send({success: result})
    }
  })

})

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'))
})





io.on('connection', (socket) => {

  socket.on('join', ({user, room}) => {
    const messages = rooms[room]

    const roomToLeave = Object.keys(socket.rooms)[1]
    socket.leave(roomToLeave)

    socket.emit('updateMessages', messages)

    socket.join(room)


  })

  socket.on('update', (messages) => {
    const cur = Object.keys(socket.rooms)[1]
    rooms[cur] = messages
    socket.emit('updateMessages', rooms[cur])
  })


  socket.on('sendMessageToServer', ({newMessage, room}) => {
    const currentRoom = Object.keys(socket.rooms)[1]
    const messages = addMessage(newMessage, currentRoom)
    socket.to(currentRoom).emit(room, messages)
  })


  socket.on('diconnect', () => {
    console.log('disconnected')
    removeUser(socket.id)
  })
})

server.listen(port, () => 'connected to port ' + port)
