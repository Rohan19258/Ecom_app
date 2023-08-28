const router=require("express").Router();
const express=require("express");
const catchAsyncErrors=require("../middleware/catchasyncerror");
const Order=require("../model/ordermodel");
const Cartitem=require("../model/cartmodel")
const auth=require("../middleware/auth");
const app=express();
const bodyParser=require("body-parser")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


router.post("/createorder",auth.auth,async(req,res)=>{

try{
      const order = await Order.create({
        ShippingInfo:req.body.ShippingInfo,
        orderItems:req.body.orderItems,
        itemsPrice:req.body.itemsPrice,
        taxPrice:req.body.taxPrice,
        shippingPrice:req.body.shippingPrice,
        totalPrice:req.body.totalPrice,
        paidAt: Date.now(),
        user: req.user,
      });
    
      res.status(201).json({
        success: true,
        order,
      });
    }catch(error){
      console.log(error)
    }
})



router.put("/updateorder/:id",auth.auth,catchAsyncErrors(async(req,res,next)=>{

  const order=await Order.findById(req.params.id) 

  if(!order){
    return res.status(400).json({message:"order does not exist"})
  }

  // if(order.status==="Delivered"){
  //   return res.status(400).json({message:"order already delivered"})
  // }

  // if(order.status==="shipped"){
  //   return res.status(400).json({message:"order already shippped"})
  // }

const data=await Order.findByIdAndUpdate(req.params.id,req.body,{new:true})
res.status(201).json({
  success:true,
  data
})
}))


router.delete("/deleteorder/:id",auth.auth,auth.authorizeRoles,catchAsyncErrors(async(req,res,next)=>{
  const order=await Order.findById(req.params.id)

  if(!order){
    return res.status(400).json({message:"order does not exist"})
  }

  // order=await Order.findByIdAndDelete(req.params.id)
  await order.remove();

  res.status(200).json({
    success:true
  })
}))

router.get("/getallorder",auth.auth,catchAsyncErrors(async(req,res,next)=>{
const order=await Order.find()

res.status(200).json({
  success:true,
  order
})
}))

router.get("/getuserorder",auth.auth,catchAsyncErrors(async(req,res,next)=>{
  const order=await Order.find({user:req.user})
  
  res.status(200).json({
    success:true,
    order
  })
  }))

router.post("/savecartitem",auth.auth,catchAsyncErrors(async(req,res,next)=>{
 try{
  const Cart=await Cartitem.create({
    id:req.body.id,
    image:req.body.image,
    title:req.body.title,
    qty:req.body.qty,
    price:req.body.price,
    instock:req.body.instock,
    user:req.body.user
  })

  res.status(201).json({
    success: true,
    Cart,
  });
}catch(error){
  console.log(error)
}
}))

router.get("/getcartitem",auth.auth,catchAsyncErrors(async(req,res,next)=>{

  const cart=await Cartitem.find({user:req.user})

  res.status(200).json({
    success:true,
    cart
  })
}

))


module.exports=router;