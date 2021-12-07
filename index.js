const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Auth_Routes = require('./Routes/Auth')
const Product_Routes = require('./Routes/Product')
const Cart_Routes = require('./Routes/Cart')
const Order_Routes = require('./Routes/Orders')
const Payment_Routes = require('./Routes/Stripe')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
const port = 5000
dotenv.config()

mongoose
.connect(process.env.MONGO_URL)
.then(()=>{console.log("DB On")})
.catch((err)=>{
    console.log(err)
})

app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use('/api/auth',Auth_Routes);
app.use('/api/product',Product_Routes);
app.use('/api/cart',Cart_Routes);
app.use('/api/order',Order_Routes);
app.use('/api/checkout',Payment_Routes);
  
app.listen(port,()=>{
    console.log('Server Running');
})