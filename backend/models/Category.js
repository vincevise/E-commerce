const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({ 
        name:{
            type:String,
            required:true
        },
        products:[  {
                type:mongoose.Types.ObjectId,
                ref:'productModel'
            }
        ] 
})

const categoryModel = mongoose.model('categoryModel',categorySchema)

module.exports = categoryModel;