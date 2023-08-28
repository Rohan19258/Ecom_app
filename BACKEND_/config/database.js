const mongoose=require("mongoose");

const DB="mongodb+srv://ecom:query1278@cluster0.tfk24rp.mongodb.net/mernecomn?retryWrites=true&w=majority"
// mongodb+srv://ecom:query1278@cluster0.tfk24rp.mongodb.net/mernecomn?retryWrites=true&w=majority

mongoose.set('strictQuery', true);
const connectDatabase=()=>{

    mongoose.connect(DB,{
        useNewUrlParser:true,useUnifiedTopology: true 
    }).then(()=>{
        console.log("connection successful")
    }).catch((err)=>{
        console.log("err")
    })
}


module.exports=connectDatabase;