const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter the username'] 
    },
    description:{
        type:String,
        required:[true, 'Please enter the description']
    },
    stock:{
        type:Number,
        required:[true, 'please enter quantity']
    }, 
    category:[
        {
            type:mongoose.Types.ObjectId,
            ref:'categoryModel',
            unique:true
        }
    ],
    price: {type:Number, required:[true,'please mention price']} ,
    images:[ {type:String} ]
})

const productModel = mongoose.model("productModel",productSchema)

module.exports = {productModel}  