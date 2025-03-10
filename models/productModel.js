const  mongoose = require ('mongoose')

const productSchema =mongoose.Schema({
    Pname:String,
    Pprice:Number, 
    Category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    }
})
const productsModel = mongoose.model('products',productSchema)
module.exports ={productsModel}