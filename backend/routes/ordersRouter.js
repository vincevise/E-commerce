const { createOrder, getAllOrders, getUserOrders } = require('../controller/orderController')


const orderRouter = require('express').Router()

orderRouter.post('/',createOrder)
orderRouter.get('/',getAllOrders)
orderRouter.get('/user-orders/:username',getUserOrders)

module.exports = {
    orderRouter
}