const express = require('express')
const { connectDB } = require('./config/db')
const { userRouter } = require('./routes/userRouter')
require('dotenv').config({path:'./config/.env'})
const cookieParser = require('cookie-parser')
const { productRouter } = require('./routes/productRoutes')
const cors = require('cors');
const { cartRouter } = require('./routes/cartRouter')



const port = process.env.PORT || 7000
const app = express()
console.log(port)
connectDB()


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
app.use(cors());
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
app.use(cookieParser())
app.use('/api/auth',userRouter) 
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter) 

app.get('/',(req,res)=>{
    res.status(200).json({msg:'its up and running'}) 
})

app.listen(port,()=>console.log(`server listening on port: ${port}`))
 

  