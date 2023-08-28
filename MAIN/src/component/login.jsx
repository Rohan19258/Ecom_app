import {Row ,Col,Form,Button,InputGroup} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import "../css/register.css"
import axios from 'axios'
import { SiAcclaim } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

const Login=()=>{

    const [useremail,setuseremail]=useState("")
    const [userotp,setuserotp]=useState("")
const [otprequest,setotprequest]=useState("Send Otp")

const navigate=useNavigate()

console.log(useremail)
// console.log(userotp)
const getotp=()=>{

const formdata={
    email:useremail
}


    axios.post("http://localhost:8000/v1/user/signin",formdata).then(res=>{


setotprequest("Resend Otp")
alert("Otp Send Successfully")
  }).catch(error=>{
alert("Register Email not Found")
  })

}


const handleSubmit = (e) => {
    e.preventDefault();
 
   const otpdata={
     email:useremail,
 otp:userotp
    
   }

axios.post("http://localhost:8000/v1/user/verify",otpdata).then(res=>{

alert("Login successfully")
localStorage.setItem("token",res.data.token)
localStorage.setItem("email",useremail)
navigate("/")

}).catch(error=>{
alert("Invalid Input")
})

  };





    return (
<>
<div id="Register"> 
<div id="register-main">
<div id="register-top">
    <h4 onClick={()=>{navigate("/register")}}> Register</h4>
    <div> <SiAcclaim/></div>
    <h4> Otp</h4>
   <div> <SiAcclaim/></div>
    <h2>Login</h2>
    </div>
<div id="register-body">
<form className='d-flex flex-column align-items-center' >


<InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Email Id</InputGroup.Text>
        <Form.Control
        type="email"
          placeholder="Email"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={useremail}
          onChange={(e)=>{setuseremail(e.target.value)}}
        />
      </InputGroup>

        <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">OTP</InputGroup.Text>
        <Form.Control
        type="text"
          placeholder="2112"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={userotp}
        maxlength="4"
          onChange={(e)=>{setuserotp(e.target.value)}}
        />
      </InputGroup>


    <button type="submit" onClick={handleSubmit}>submit</button>
  
      </form>


      <p>Click here to,<span  className="otpr" onClick={getotp}>{otprequest}</span></p>
</div>
</div>
</div>
</>
    )
}


export default Login;