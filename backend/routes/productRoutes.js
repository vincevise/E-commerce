const { authHelper } = require('../controller/authController')
const { createProduct, getProducts, deleteProduct, createCategory, addProductsToCategory, getOneCategory, searchProducts, getSingleProduct } = require('../controller/productController')
 

const productRouter = require('express').Router()

// CREATE PRODUCT
productRouter.post('/create',createProduct)
productRouter.get('/getProducts',getProducts)
productRouter.delete('/deleteProduct/:id',deleteProduct)
productRouter.get('/get-product/:id',getSingleProduct)

// SEARCH QUERY
productRouter.get('/search/:key',searchProducts)

 



module.exports = {productRouter}