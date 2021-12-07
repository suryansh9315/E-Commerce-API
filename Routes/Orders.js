const express = require('express')
const router = express.Router();
const OrderDB = require('../Modules/Orders')
const NormalAuth = require('../middlewares/Normal_Auth')

router.post('/create',NormalAuth,async (req,res)=>{
    try{
        let order = await OrderDB.create({
            userid: req.body.userid,
            address:{"address":req.body.address},
            amount:req.body.amount
        });
         res.status(200).json({"message":"Successful","cart_info":order})
    } catch(err){
        res.status(400).json({"Error":"Error Occured"})
    }
})

router.post('/delete',NormalAuth,async (req,res)=>{
    try{
        let order = await OrderDB.findById(req.body.orderid)
        if (!order) {
            return res.status(400).json({ "message": "Order Does Not exist" })
        } else{
            cart = await OrderDB.findByIdAndDelete(req.body.orderid)
            res.status(200).json({"message":"Successful"})
        }
    } catch(err){
        res.status(400).json({ "message": "Error Occured" })
    }
})

router.post('/get',NormalAuth,async (req,res)=>{
    try{
        let order = await OrderDB.findById(req.body.orderid)
        if (!order) {
            return res.status(400).json({ "message": "Order Does Not exist" })
        } else{
            res.status(200).json({"message":"Successful","Order_info":order})
        }
    } catch(err){
        res.status(400).json({ "message": "Error Occured" })
    }
})

router.get('/getAll',NormalAuth,async (req,res)=>{
    try{
        let orders = await OrderDB.find({ userid: req.body.userid })
        if (!orders) {
            return res.status(400).json({ "message": "No Orders" })
        }
        res.status(200).json({"message":"Successful2323","orders":orders})
    } catch(err){
        res.status(400).json({ "message": "Error Occured" })
    }
})

module.exports = router