const  express = require ('express')
const {userModel}=require('./models/userModel')
const  mongoose = require ('mongoose')
const jwt=require("jsonwebtoken")
const {auth}=require('./routes/middleware/auth')
const  joi = require ('joi')

const app =express()
app.use(express.json())
const {productsModel}= require('./models/productModel')
const productRoutesDevplus= require('./routes/productRoute')
const categoryRoutesDevplus= require('./routes/categoryRoute')
const userRoutesDevplus=require('./routes/userRoute')
const orderRoutesDevplus=require('./routes/orderRoute')

mongoose.connect("mongodb://localhost:27017/e-commerse")
.then(()=>console.log("Connected succesfully"))
.catch(()=>console.log("Inot Connected"))



const cors=require('cors')
app.use(cors())
app.use('/users',userRoutesDevplus)


app.get('/trendingProducts',async(req,res)=>{
    const data =await productsModel.find().limit(4).sort({createdAt:-1}).populate({
        path:"Category",
        model:"Category",
    })
        res.send(data)
    
})


// app.use(auth['admin'])
function Validateproducts(body){
    const product = joi.object({
        Pname:joi.string().required(),
        Pprice:joi.number().required(),
        Category:joi.string().required(),


    })
    return product.validate(body)
}

app.use('/order',orderRoutesDevplus)
app.use('/pr',productRoutesDevplus)
app.use('/category',categoryRoutesDevplus);



// app.post('/products',(req,res)=>{
//     // console.log(req.body)
//     const {error}= Validateproducts(req.body)
//     if(error) return res.send(error.message)


//     new productsModel({
//         Pname:req.body.Pname,
//         Pprice:req.body.Pprice,
//         Category:req.body.Category
//     }).save()
//     res.send('Wd mhdsnthy,Wala Save gareyay')

// })

app.put('/products/:id',async(req,res)=>{
    console.log(req.params.id)
    await productsModel.findByIdAndUpdate(req.params.id,
        {
            Pname:req.body.Pname,
            Pprice:req.body.Pprice,
            Category:req.body.Category
        })
        
    res.send('Wala Update gareyay')
})

app.get('/products',async(req,res)=>{
    const products = await productsModel.find().populate({
        path:"Category",
        model:"Category",
        select:"-_id Cname"
    })
    res.send(products)

})
app.delete('/products/:id',async(req,res)=>{
    // console.log(req.params.id)
    await productsModel.findByIdAndDelete(req.params.id)
    res.send('Wala delete gareyay')
})
app.get('/products/:id',async(req,res)=>{
    const product = await productsModel.findById(req.params.id)
    res.send(product)
})








// const products=[{
//     id:1,
//     Pname:"kabo",
//     Pprice:10,
//     Category:"men"
// },
// {
//     id:2,
//     Pname:"Baati",
//     Pprice:10,
//     Category:"women"
// },
// {
//     id:3,
//     Pname:"Surwaal",
//     Pprice:7,
//     Category:"men"
// },

// ]

// app.get('/products',(req,res)=>{
//     // const pfilter =products.filter(p=>p.Category== req.params.Category)
//     res.send(products)

// })
// app.post('/products/post',(req,res)=>{
//     console.log(req.body)
//     products.push(req.body);
//     res.send('Saved')
// })
























// const data= [
//     {
//       "userId": 1,
//       "id": 1,
//       "title": "delectus aut autem",
//       "completed": false
//     },
//     {
//       "userId": 1,
//       "id": 2,
//       "title": "quis ut nam facilis et officia qui",
//       "completed": false
//     },
//     {
//       "userId": 1,
//       "id": 3,
//       "title": "fugiat veniam minus",
//       "completed": false
//     },
//     {
//       "userId": 1,
//       "id": 4,
//       "title": "et porro tempora",
//       "completed": true
//     },
//     {
//       "userId": 1,
//       "id": 5,
//       "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
//       "completed": false
//     }
//   ]

// app.get('/rashka/:cadey',(req,res)=>{
//     // console.log(req.params)
// const xog=data.filter(d=>d.id == parseInt(req.params.cadey))
//     res.send(xog)
// })
// const port = 7000
require('dotenv').config()
app.listen(process.env.PORT, ()=>{
    console.log("listening on post"+process.env.PORT)
})
// console.log("Abdirashiid")