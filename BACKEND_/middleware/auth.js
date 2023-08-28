const jwt = require("jsonwebtoken");
const Loginuser=require("../model/usermodel")
const Rmodel=require("../model/register")


const auth=async(req,res,next)=>{
    const token=req.headers.authorization || req.headers["authentication"]
    const email=req.headers["auth"]
    if(!token){
        return res.json({message:"User not Loged In"})
    }
    try{
  
        const verifyUser=jwt.verify(token,"authenticationpagenodejsassignmentgdfhghghjhg");
console.log(verifyUser)


const data= await Loginuser.findOne({_id:verifyUser._id})
//  console.log(this._id)
// if(user){

    // req.user= await Loginuser.findById(verifyUser.id)
    req.user=email
    console.log(req.user)
    next()
    // }else{
    //   res.json({message:"failed"})
    // }
    }catch(error){
res.status(401).send(error)
    }
}

const authorizeRoles=async(req,res,next)=>{
const roles="admin";
 const email="rohanufn@gmail.com"
    const userroles=await Rmodel.find({email:email}).select("+role")

    if(!userroles){
        return res.status(400).json({message:"user is not allowed to access this resources"})
  
    }

if(userroles.role===roles){
    next()
}else{
    return res.status(400).json({message:"user is not allowed to access this resources"})
}
 
}




module.exports={auth:auth,
    authorizeRoles:authorizeRoles}