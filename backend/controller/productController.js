const categoryModel = require("../models/Category");
const { productModel } = require("../models/Products");
const { cloudinary } = require("../utils/cloudinary");

 
const getProducts = async(req,res) =>{
    try{
        const products = await productModel.find().populate('category','name')
        if(!products){
            return res.status(400).json({error:'no products exsists'})
        }

        res.status(200).json({message:'data fetched successfully',data:products})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const getSingleProduct = async(req,res) => {
    const {id} = req.params
    try{
        const product = await productModel.findById(id)

        if(!product) return res.status(400).json({error:'does not exsist'})
        res.status(200).json(product)
    }catch(error){
        res.status(400).json({error:message.error})
    }
}

const createProduct = async(req,res) => {
    
    const {name,description,stock,price,category} = req.body.input
    const arr = [category]
    const urls = [] 
    try{
        await req.body.previewSource.map(async(x,i)=>{
            urls.push(`https://res.cloudinary.com/deuik7128/image/upload/v1671080781/ecommerce/${name}/${i}.jpg`)
            const uploadResponse = await cloudinary.uploader.upload(x,{
                upload_preset:'mh4fjx7f',
                public_id:i,
                folder: `ecommerce/${name}/`,
            })
        })
        const isProduct = await productModel.findOne({name:name})
        if(isProduct)  res.status(400).json({error:'this product already exsist'})
        const product = await productModel.create({
            name:name,
            description:description,
            stock:stock,
            price:price,  
            images:urls,
            category:arr
        })
        const newCategory = await categoryModel.findOneAndUpdate({_id:category},{$push:{products:product._id}})
        res.status(200).json({message:'created successfully',data:{product}})

    }catch(error){
        console.error(error) 
        res.status(400).json({error:error.message})
    }
} 

const deleteProduct = async(req,res) => {
    const {id} = req.params
    try{
        const product = await productModel.findByIdAndDelete(id)    
        if(!product){
            return res.status(400).json({error:'Product does not exist'})
        }
        res.status(200).json({message:'message recieved successfully',data:product})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const addProductsToCategory = async(req,res)=>{
    const id = {
        _id:'63ae81fe83a912509dae6a31'
    } 

    const productId = [
        {_id:'63aea71476c83d54ff003045'} 
    ]
    try{
        const category = await categoryModel.findOneAndUpdate(id,{$push:{products:productId}})

        res.status(200).json({message:"product created successfully",data:{category }})

    }catch(error){
        console.log(error)
        res.status(400).json({error:error.message})
    }
}

const createCategory = async(req,res)=>{
    const {name} = req.body
    console.log(name,'ye wala')
    try{
        const response = await categoryModel.create(
            {name:name}
        )
        res.status(200).json({message:"catgory created successfully",data:response})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const getOneCategory = async(req,res)=>{
    const {category} = req.params
    try{
        const response = await categoryModel.findOne(
            {name:category}
        ).populate('products')

        res.status(200).json({message:"category found",data:response})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const searchProducts = async(req,res)=>{
    try{

        const data = await productModel.find(
            {
                "$or":[
                    {"name":{$regex:req.params.key, $options:'i'}},
                    {"description":{$regex:req.params.key, $options:'i'}},
                ]
            }
        )
        res.status(200).json({data:data})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const getCategory = async(req,res) => {
    try{
        const data = await categoryModel.find()
        if(!data) return res.status(400).json({error:'data not found'})

        res.status(200).json({data:data})
    }catch(error){  
        res.status(400).json({error:error})
    }
}

 

module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    createCategory,
    addProductsToCategory,
    getOneCategory,
    searchProducts,
    getCategory,
    getSingleProduct
}