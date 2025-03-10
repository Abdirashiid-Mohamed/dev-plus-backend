const express=require('express')
const {getOrder,createOrder,updateOrder,deleteOrder,getOrderByUser}=require('../controllers/OrderCtrl')
const {auth}=require ('./middleware/auth')
const route =express.Router();

route.get('/',getOrder)
route.get('/byloggedInUser',auth(['admin','user']),getOrderByUser)
route.post('/',auth(['admin','user']),createOrder)
route.put('/:id',auth(['admin','user']),updateOrder)
route.delete('/:id',auth(['admin','user']),deleteOrder)



module.exports=route
