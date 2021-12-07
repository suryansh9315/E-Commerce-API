const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {type:String,required:true,unique:true},
    desc: {type:String},
    image: {type:String},
    size: {type:Array},
    color: {type:Array},
    categories: {type:Array},
    price: {type:Number,required:true},
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Products',ProductSchema)