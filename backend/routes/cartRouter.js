const { createCart, getCart } = require('../controller/cartController')

const cartRouter = require('express').Router()

cartRouter.post('/',createCart)
cartRouter.get('/',getCart)
module.exports = {cartRouter}   