const jwt = require('jsonwebtoken');

const adminauth = (req,res,next)=>{
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
            if(err){
                res.status(400).json({"error":"Invalid Token"})
            } else{
                if(payload.id===req.body.userid){
                    if(payload.isAdmin){
                        next()
                    }
                    else{
                        res.status(400).json({"error":"You Do Not Have Permisssion"})
                    }
                } else {
                    res.status(400).json({"error":"Invalid Token"})
                }
                
            }
        })
    }
    else{
        res.status(400).json({"error":"Token Does Not Exist"})
    }
}

module.exports = adminauth