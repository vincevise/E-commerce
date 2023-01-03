const { authHelper } = require('../controller/authController')
const { createProduct, getProducts, deleteProduct, createCategory, addProductsToCategory, getOneCategory, searchProducts } = require('../controller/productController')
 

const productRouter = require('express').Router()

// CREATE PRODUCT
productRouter.post('/create',createProduct)
productRouter.get('/getProducts',getProducts)
productRouter.delete('/deleteProduct/:id',deleteProduct)

// SEARCH QUERY
productRouter.get('/search/:key',searchProducts)

 



module.exports = {productRouter}