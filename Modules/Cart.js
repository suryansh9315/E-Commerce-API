const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userid: {type:String,required:true},
    products: [
        {
            productid:{type:String},
            quantity:{type:Number,default:1}
        }
    ],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart',CartSchema)