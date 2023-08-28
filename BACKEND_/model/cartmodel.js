const mongoose=require("mongoose")


const cartSchema=mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    qty:{
        type:String,
        required:true
    },
    instock:{
        type:String,
        required:true 
    },
    user: {
        type:String,
         required: true,
       }


})

module.exports=mongoose.model("Cart",cartSchema)