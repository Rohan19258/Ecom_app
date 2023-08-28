const express=require("express");
const app=express();
const connectDatabase = require("./config/database");
require("dotenv").config();
const cloudinary = require("cloudinary");
const cors=require("cors")
const fileupload=require("express-fileupload")
const multer=require("multer")

// app.use(fileupload())
app.use(fileupload({
  useTempFiles:true
}))
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:false, parameterLimit:50000}))
app.use(cors())


//storge
const Storage=multer.diskStorage({
  destination:"uploads",
  filename:(req,file,cb)=>{
      cb(null,file.originalname)
  }
})

const upload=multer({
  storage:Storage
}).single('image')



//routes
const userRoute=require("./routes/userRoute")
const productRoute=require("./routes/productRoute")
const orderroute=require("./routes/orderroute")

//routes
app.use("/v1/user",userRoute)
app.use("/v1/product",productRoute)
app.use("/v1/order",orderroute)




//database connecting
connectDatabase()
//
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



app.listen(process.env.PORT, () => {
     console.log(`Server is working on http://localhost:${process.env.PORT}`);
 });


 