const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userid: {type:String,required:true},
    products: [
        {
            productid:{type:String},
            quantity:{type:Number,default:1}
        }
    ],
    address: {type:Object,required:true},
    status: {type:String,default:"pending"},
    amount: {type:Number,required:true},
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Orders',OrderSchema)