const {userModel,ValidateUser,ValidateLogin}=require("../models/userModel");
const bcrypt =require("bcrypt")
const jwt=require("jsonwebtoken")
const createUser=async(req,res)=>{
    try {
        // const salt=bcrypt.genSalt(10)
        const{error}=ValidateUser(req.body)
        if(error)return res.send({status:false,message:error.message})
        const hashedPassword=await bcrypt.hash(req.body.password,10)
        // console.log(hashedPassword)
        req.body.password=hashedPassword
        const checkIfUserExists=await userModel.findOne({email:req.body.email})
       if(checkIfUserExists) return res.send({status:false,message:"User already exists"})
        new userModel (req.body).save()
        res.send({status:true,message:"successfuly created user["+req.body.name+"]"})
    } catch (error) {
       res.send({status:false,message:error.message}); 
    }
}

const Login=async(req,res)=>{
try {
    const{error}= ValidateLogin(req.body)
    if(error)return res.send({status:false,message:error.message});
    const checkUser=await userModel.findOne({email:req.body.email})
    if(!checkUser)return res.send({status:false,message:"User or password incorrect"})
        const checkPassword=await bcrypt.compare(req.body.password,checkUser.password)
     if (!checkPassword) return res.send({status:false,message:"User or password incorrect"})
        const token =jwt.sign({id:checkUser._id,email:checkUser.email,name:checkUser.name},"tjMWBcFuCDauP7ZaJC7aOByeFli01d9fb0912ad2cc3aecommerce")
    console.log(token)

        res.send({status:true,message:`Succesfuly Logged in as[${checkUser.name}]`,token:token})
} catch (error) {
    res.send({status:false,message:error.message});
}
}

module.exports={createUser,Login}