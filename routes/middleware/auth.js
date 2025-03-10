const jwt =require('jsonwebtoken')
const {userModel}=require('../../models/userModel')
const auth =(role)=>{
    console.log(role)
    return async(req,res,next)=>{
        const token =req.headers['token']
        if(!token) return res.status(403).send({status:false,message:"you are not authenticated"})
            jwt.verify(token,"tjMWBcFuCDauP7ZaJC7aOByeFli01d9fb0912ad2cc3aecommerce",async(err,decoded)=>{
        if(err) return res.status(401).send({status:false,message:"invalid token"})
        const LoggedinUserData= await userModel.findById(decoded.id)
        if(!LoggedinUserData) return res.status(401).send({status:false,message:"user not exist"})
        console.log("LoggedinUserData",LoggedinUserData.role, role)
        if(!role.includes(LoggedinUserData.role)) return res.status(401).send({status:false,message:"un-autherized"+"the required role is"+role+" and ur role is "+LoggedinUserData.role})
            // console.log(token)
        req.user = LoggedinUserData
        next()
        
            })
    
    }

}
module.exports={auth}