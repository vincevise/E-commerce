const mongoose = require('mongoose')
require('dotenv').config('./config/.env')


const connectDB = async () =>{
    try{
        const res = await mongoose.connect(process.env.MONGO_URI)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
   
}

module.exports = {connectDB}