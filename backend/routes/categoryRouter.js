const { createCategory, addProductsToCategory, getOneCategory, getCategory } = require('../controller/productController')

const categoryRouter = require('express').Router()

categoryRouter.post('/',createCategory)
categoryRouter.get('/',getCategory)
categoryRouter.post('/pushInCategory',addProductsToCategory)
categoryRouter.get('/:category',getOneCategory)

module.exports = {categoryRouter}
