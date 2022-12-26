const mongoose = require('mongoose')
require('dotenv').config('./config/.env')


const connectDB = async () =>{
    const res = await mongoose.connect(process.env.MONGO_URI)
    if(res){
        console.log('Server connected')
    }
}

module.exports = {connectDB}