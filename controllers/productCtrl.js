const {productsModel}= require('../models/productModel')

const createProduct =(req,res)=>{
    try {
        
        new productsModel(req.body).save()
    res.send('Product create Succesfully')
    
    } catch (error) {
        res.send(error.message)        
    }

}

module.exports={createProduct}