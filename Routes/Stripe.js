const express = require('express')
const router = express.Router()
const configurestripe = require('stripe')
const stripe = configurestripe('sk_test_51K2VUGLHdmbQBmKfzILVCzqPUpo9ojVjndkpzrNH3SMlf6BeHDIGzQEWpCBJUXpqKJmkuxfY327bpBHvWUBsWDak006rClhgHi')

router.post('/payment',(req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd"
    },(err,obj)=>{
        if(err){
            res.status(400).json(err)
        } else{
            res.status(200).json(obj)
        }
    })
})

module.exports = router