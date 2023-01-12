const { orderModel } = require("../models/Order")
const { userModel } = require("../models/User")

const createOrder = async(req,res) =>{
    const data = req.body
    try{
        const user = await userModel.findOne({email:data.email})
        if(!user) return res.status(400).json({error:'user does not exsist'})
        data.user = user._id
        const response = await orderModel.create(data)

        res.status(200).json({data:response.data})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const getAllOrders = async(req,res)=>{
    try{
        const data = await orderModel.find().populate('user').populate({
            path:'products.product'
            
        })

        if(!data) return res.status(400).json({error:'not found'})
        res.status(200).json(data)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const getUserOrders = async (req,res) =>{
    const {username} = req.params
    try{
        const {_id:userID} = await userModel.findOne({username:username})
        // console.log(userID)

        const orders = await orderModel.find({user:userID}).populate({
            path:'user'
        }) 
     
        
        res.status(200).json({orders})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    createOrder,getAllOrders,getUserOrders
}