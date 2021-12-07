const express = require('express')
const router = express.Router();
const UserDB = require('../Modules/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',[
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Enter a Valid Password').isLength({ min: 8 }),
    body('username','Enter Valid Username').isLength({min:8})
  ],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await UserDB.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({ "message": "Email already exixts" })
    }else{
        user = await UserDB.findOne({ username: req.body.username })
        if (user) {
            return res.status(400).json({ "message": "username already exixts" })
        }
    }
    const salt = await bcrypt.genSalt(10);
    const encPass = await bcrypt.hash(req.body.password, salt);
    user = await UserDB.create({
        name: req.body.name,
        username:req.body.username,
        email: req.body.email,
        password: encPass
    });
    let token = jwt.sign({ id: user._id, isAdmin:user.isAdmin }, process.env.JWT_SECRET);
    res.cookie('jwt',token,{maxAge:1000*60, httpOnly:true})
    res.status(200).json({"user_id":user._id,username:user.username})
})

router.post('/login',[
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Enter a Valid Password').isLength({ min: 8 })
  ],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let user = await UserDB.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ "message": "User doesn't exixts" })
    }
    const passwordcheck = await bcrypt.compare(req.body.password, user.password);
    if (!passwordcheck) {
        return res.status(400).json({ "message": "User doesn't exixts" })
    }
    let token = jwt.sign({ id: user._id, isAdmin:user.isAdmin}, process.env.JWT_SECRET,{ expiresIn: '24h' });
    res.cookie('jwt',token,{maxAge:1000*60*60*24, httpOnly:true})
    res.status(200).json({"user_id":user._id,username:user.username})
})

module.exports = router