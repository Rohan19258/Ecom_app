const router=require("express").Router();
const nodemailer=require("nodemailer");
const validator = require("validator");
const User=require("../model/usermodel")
const Rmodel=require("../model/register")
const bodyParser=require("body-parser")
const jwt=require("jsonwebtoken")
const express=require("express");
const app=express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



let digits = '0123456789';
let limit = 4;
let otp = ''


router.post("/register",async(req,res)=>{
try{
    const {name,email}=req.body
    let data=new Rmodel({
        name:name,
        email:email
    })

    let existinguser;
try{
existinguser= await Rmodel.findOne({email:email})
}catch(error){
console.log(error)
}
if (existinguser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instead" });
  }
if(! validator.isEmail(email)){
    return res
    .status(400)
    .json({ message: "invalid input" });
}

try {
    await data.save();
    return res.status(201).json({ message: data });
  } catch (err) {
    console.log(err);
  }


}catch(err){
    console.log(err.message)
}
})





router.post("/signin",async(req,res)=>{
    otp=""
    let email=req.body.email
   let existinguser= await Rmodel.findOne({email:email})

   if (!existinguser) {
    return res
      .status(400)
      .json({ message: "Not Registered User" });
  }

 

    try{

// console.log(email)

for (i = 0; i < limit; i++) {
    otp += Math.floor(Math.random() * 10);
}

console.log(otp)

let transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"yesitisme121@gmail.com",
        pass:"kkexscaeginkawcb"
    }
    })
    
    let mailOptions={
    from:"yesitisme121@gmail.com",
    to:`${email}`,
    subject:"nothing",
    text:otp,
    }
    
    transporter.sendMail(mailOptions,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("otp sent successfully")
       
            res.send("otp send")
        }
    })
    
}catch(err){
    console.log(err.message)
}
    
})



router.post('/verify', async(req, res) => {
   try{
    let otpreceived = req.body.otp;
    console.log(otpreceived)
    console.log(otp)

    let email = req.body.email;
   let data=new User({
       "email":email
   })

   let userlogin;
   try{
       userlogin=await Rmodel.findOne({email:req.body.email});
   }catch(error){
   console.log(error)
   }
   if(!userlogin){
       return res
       .status(400)
       .json({ message: "register first" });
   }

    if (otp === otpreceived) {
        const token=  await data.generateAuthToken();
        return res.status(200).json({
           status:"success",
           token
       })
    }
    else {
        res.status(500).send("Invalid OTP")
    }
}catch(err){
    console.log(err.message)
}
})


router.get("/",(req,res)=>{

res.send("hello world")   
})








module.exports=router;