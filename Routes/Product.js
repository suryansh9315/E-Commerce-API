const express = require('express')
const router = express.Router();
const ProductDB = require('../Modules/Product')
const AdminAuth = require('../middlewares/Admin_Auth')
const { body, validationResult } = require('express-validator');

router.post('/add',AdminAuth,[
    body('title','Enter Valid title').isLength({min:3})
  ],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let product = await ProductDB.findOne({ title: req.body.title })
    if (product) {
        return res.status(400).json({ "message": "Product already exixts" })
    }

    product = await ProductDB.create({
        title: req.body.title,
        desc: req.body.desc?req.body.desc:"",
        image: req.body.image?req.body.image:"",
        size: req.body.size?req.body.size:"",
        color: req.body.color?req.body.color:"",
        categories: req.body.categories?req.body.categories:"",
        price: req.body.price,
    });
    res.status(200).json({"message":"Successful","Product_Info":product})
})

router.post('/update',AdminAuth,async (req,res)=>{
    try{
        let product = await ProductDB.findById(req.body.id)
        if (!product) {
            return res.status(400).json({ "message": "Product Does Not exist" })
        }
        product = await ProductDB.findByIdAndUpdate(req.body.id,{$set: req.body},{new:true})
        res.status(200).json({"message":"Successful","Product_Info":product})
    } catch(err){
        res.status(400).json({ "message": "Product Does Not exist" })
    }
})

router.post('/delete',AdminAuth,async (req,res)=>{
    try{
        let product = await ProductDB.findById(req.body.id)
        if (!product) {
            return res.status(400).json({ "message": "Product Does Not exist" })
        }
        product = await ProductDB.findByIdAndDelete(req.body.id)
        res.status(200).json({"message":"Successful"})
    } catch(err){
        res.status(400).json({ "message": "Product Does Not exist" })
    }
})

router.get('/get',async (req,res)=>{
    try{
        let product = await ProductDB.findById(req.body.id)
        if (!product) {
            return res.status(400).json({ "message": "Product Does Not exist" })
        }
        res.status(200).json({"message":"Successful","product_info":product})
    } catch(err){
        res.status(400).json({ "message": "Product Does Not exist" })
    }
})

router.get('/getAll',async (req,res)=>{
    try{
        let products;
        const categories = req.body.categories
        if(categories){
            products = await ProductDB.find({
                categories:{
                    $in:[categories],
                },
            })
        } else{
            products = await ProductDB.find()
        }
        res.status(200).json({"message":"Successful","product_info":products})
    } catch(err){
        res.status(400).json({ "message": "ProductS Does Not exist" })
    }
})

module.exports = router