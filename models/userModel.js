const  mongoose = require ('mongoose');
const joi = require('joi');
const userSchema =mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        default:"user",
        required:true,
        enum:['admin','user']

    }
},{timestamps:true})

const userModel=mongoose.model('user',userSchema)


function ValidateUser(body){
    const user=joi.object({
        name:joi.string().required(),
        email:joi.string().email({ tlds: { allow: false  } }).required(),
        password:joi.string().required(),
        role:joi.string()

        
    })
    return user.validate(body)

}
function ValidateLogin(body){
    const user=joi.object({
        email:joi.string().email({ tlds: { allow: false  } }).required(),
        password:joi.string().required(),

        
    })
    return user.validate(body)
}
module.exports={userModel,ValidateUser,ValidateLogin}