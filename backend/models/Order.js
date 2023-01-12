const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'userModel'
    },
    products:[{
        product: {
            type: mongoose.Types.ObjectId,
            ref: "productModel",
        },
        qty: { type: Number }, 
    }],
    bill:{
        totalCost:{
            type:Number,
            required:true
        },
        gst:{
            type:Number,
            required:true
        },
        finalCost:{
            type:Number,
            required:true
        }
    },
    shippingInfo:{
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        }
    },
    date:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'processing'
    }
})

const orderModel = mongoose.model('orderModel',orderSchema)

module.exports = {
    orderModel
}