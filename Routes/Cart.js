const express = require('express')
const router = express.Router();
const CartDB = require('../Modules/Cart')
const NormalAuth = require('../middlewares/Normal_Auth')

router.post('/create',NormalAuth,async (req,res)=>{
    try{
        let cart;
        cart = await CartDB.findOne({ userid: req.body.userid })
        if (cart) {
            return res.status(202).json({ "message": "Cart already exixts","cart_info":cart})
        } else{
            cart = await CartDB.create({
                userid: req.body.userid,
                products: []
            });
            res.status(200).json({"message":"Successful","cart_info":cart})
        }
    } catch(err){
        res.status(400).json({"Error":"Error Occured"})
    }
})

router.post('/update',NormalAuth,async (req,res)=>{
    try{
        let cart = await CartDB.findOne({ userid: req.body.userid })
        if (!cart) {
            return res.status(400).json({ "message": "Cart Does Not exist" })
        } else{
            cart = await CartDB.findOneAndUpdate({ userid: req.body.userid },{$set: {products:req.body.products}},{new:true})
            res.status(200).json({"message":"Successful","cart_info":cart})
        }
    } catch(err){
        res.status(400).json({ "message": "Cart Already" })
    }
})

router.get('/get',NormalAuth,async (req,res)=>{
    try{
        let cart = await CartDB.findOne({ userid: req.body.userid })
        if (!cart) {
            return res.status(400).json({ "message": "Cart Does Not exist" })
        }
        res.status(200).json({"message":"Successful","cart_info":cart})
    } catch(err){
        res.status(400).json({ "message": "Product Does Not exist" })
    }
})

module.exports = router