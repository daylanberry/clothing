const express = require('express');
const cors = require('cors')
const bodyParser =  require('body-parser')
const path = require('path');
const compression = require('compression')


if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express();

const port = process.env.PORT || 5000

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

if (process.env.NODE_ENV === 'production') {
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

app.listen(port, error => {
  if (error) throw error;
  console.log('running on port ' + port)
})