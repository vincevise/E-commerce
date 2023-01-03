const mongoose = require('mongoose')


const reviewSchema = new mongoose.Schema({
     user:{
        type:mongoose.Types.ObjectId,
        ref:'userModel' 
     },
     product:{
        type:mongoose.Types.ObjectId,
        ref:'productModel' 
     },
     review:{
        type:String 
     },
     rating:{
         type:Number 
     }
},{timestamps:true})

const reviewModel = mongoose.model('reviewModel',reviewSchema)

module.exports = reviewModel