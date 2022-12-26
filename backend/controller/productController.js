const categoryModel = require("../models/Category");
const { productModel } = require("../models/Products");
const { cloudinary } = require("../utils/cloudinary");

 
const getProducts = async(req,res) =>{
    try{
        const products = await productModel.find()
        if(!products){
            return res.status(400).json({error:'no products exsists'})
        }

        res.status(200).json({message:'data fetched successfully',data:products})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
const createProduct = async(req,res) => {
    
    const {name,description,stock,price} = req.body.input
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
        if(isProduct) return res.status(400).json({error:'this product already exsist'})
        const product = await productModel.create({
            name:name,
            description:description,
            stock:stock,
            price:price,
            images:urls
        })
        res.status(200).json({message:'created successfully',data:product})

    }catch(error){
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
        console.log(product.name)
        res.status(200).json({message:'message recieved successfully',data:product})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const createNewProduct = async(req,res)=>{
        console.log(req.body)
    try{
        const product = await productModel.create(req.body)
        res.status(200).json({message:"product created successfully"})

    }catch(error){
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
        const response = await productModel.find(
            {category:category}
        ).populate({path:'productModel',strictPopulate:false})
        res.status(200).json({message:"category found",data:response})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

 

module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    createCategory,
    createNewProduct,
    getOneCategory
}