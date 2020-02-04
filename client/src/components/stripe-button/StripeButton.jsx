import React from 'react'
import axios from 'axios'

import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_tYA6eisdXdVyu42uM4fQsJV400ItfsKQBT'

  const onToken = (token) => {

    axios.post('/payment', {
      amount: priceForStripe,
      token
    })
    .then(response => {
      alert('Payment Successful')
    })
    .catch(err => {
      console.log('payment error: ' + JSON.parse(err))
      alert('There was an issue with our payment. Please make sure you use provided credit card')
    })

  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='Clothing'
      billingAddress
      shippingAddress
      //image='https://svgshare.co/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}


export default StripeCheckoutButton