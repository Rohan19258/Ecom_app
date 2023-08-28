const mongoose= require("mongoose");
const validator = require("validator");

const rSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    role:{
        type:String,
        default:"user"
    }

})


// rSchema.methods.generateAuthToken=async function(){
//     try{
//       //  console.log(this._id)
// const token=jwt.sign({_id:this._id},"authenticationpagenodejsassignmentgdfhghghjhg",{
//   expiresIn: "7d",
// });
// //this.tokens=this.tokens.concat({token:token})
// // await this.save();
// return token;
// //console.log(token)
//     }catch(error){
// console.log(error)
//     }
// }

module.exports=mongoose.model("Rmodel",rSchema)