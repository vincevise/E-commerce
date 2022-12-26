const { authHelper } = require('../controller/authController')
const { createProduct, getProducts, deleteProduct, createCategory, createNewProduct, getOneCategory } = require('../controller/productController')
 

const productRouter = require('express').Router()


productRouter.post('/create',createProduct)
productRouter.get('/getProducts',getProducts)
productRouter.delete('/deleteProduct/:id',deleteProduct)


productRouter.post('/category',createCategory)
productRouter.post('/productNew',createNewProduct)
productRouter.get('/category/:category',getOneCategory)

module.exports = {productRouter}