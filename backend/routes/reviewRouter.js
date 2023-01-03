const { createReview, getProductReview } = require('../controller/reviewController')

const reviewRouter = require('express').Router()

reviewRouter.post('/create-review',createReview)
reviewRouter.get('/product-review/:id',getProductReview)

module.exports = {reviewRouter}