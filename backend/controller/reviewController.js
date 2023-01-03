const reviewModel = require("../models/Review")
const { userModel } = require("../models/User")


const createReview = async(req,res) => {

    const {rating,review,product,email} = req.body
    console.log(req.body)
    try{
        
        const user = await userModel.findOne({email:email})
        let data = {
            rating,review,product,user: user._id
        }
        const response = await reviewModel.findOneAndUpdate({user:user._id},data,{ upsert: true, new: true })
        
        res.status(200).json({
            message:'Review Created Successfully',
            data:{response, username:user.username}
        }) 
    }catch(error){
        console.error(error)
        res.status(400).json({message:error.message})
    }
}

const getProductReview = async(req,res) =>{
    const {id} = req.params
    try{    
        const data = await reviewModel.find({product:id}).populate({
            path:'user',
            select:'username'
        })
        res.status(200).json({data})

    }catch(error){
        console.error(error)
        res.status(400).json({error:error.message})
    }
}


module.exports = {createReview,getProductReview}