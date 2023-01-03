const { createPayment, sendStripeApiKey } = require('../controller/paymentController')

const paymentRouter = require('express').Router()
 

paymentRouter.post('/process',createPayment)
paymentRouter.get('/stripeapikey',sendStripeApiKey)


module.exports = {paymentRouter}

