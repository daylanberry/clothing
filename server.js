const express = require('express');
const cors = require('cors')
const bodyParser =  require('body-parser')
const path = require('path');
const compression = require('compression')
const enforce = require('express-sslify')
const Chatkit = require('@pusher/chatkit-server')
require('dotenv').config()


if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express();

const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

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


const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_SECRET_KEY,
});



app.post('/users', (req, res) => {
  const { username } = req.body;

  chatkit.createUser({
    id: username,
    name: username
  })
  .then(() => {
    res.sendStatus(201)
  })
  .catch(err => {
    if (err.error === 'services/chatkit/user_already_exists') {
      console.log(`User already exists: ${username}`);
      res.sendStatus(200);
    } else {
      res.status(err.status).json(err);
    }
  })
})



app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id,
  });
  res.status(authData.status).send(authData.body);
});



app.listen(port, error => {
  if (error) throw error;
  console.log('running on port ' + port)
})