import {Container,Row ,Col,Form,Button,InputGroup} from 'react-bootstrap'
import {useState} from 'react'
import "../css/register.css"
import { SiAcclaim } from "react-icons/si";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const Register=()=>{

const [useremail,setuseremail]=useState("")
const [username,setusername]=useState("")

// console.log(useremail)
const navigate=useNavigate()


    const handleSubmit = (e) => {
      e.preventDefault();
   

     const formdata={
       name:username,
       email:useremail
     }

     console.log(formdata)

  axios.post("http://localhost:8000/v1/user/register",formdata).then(res=>{

if(res.status==201){
  alert("Register successfully")
}
else{
  alert("invalid input")
}
  }).catch(error=>{
alert("Invalid Input")
  })

    };
  

    return(
      <>
<div id="Register"> 
<div id="register-main">
<div id="register-top">
    <h2> Register</h2>
    <div> <SiAcclaim/></div>
    <h4> Otp</h4>
   <div> <SiAcclaim/></div>
    <h4 onClick={()=>{navigate("/login")}}>Login</h4>
    </div>
<div id="register-body">
<form className='d-flex flex-column align-items-center' >
  <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
        <Form.Control
        type="text"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={username}
          onChange={(e)=>{setusername(e.target.value)}}
        />
      </InputGroup>

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
      <button type="submit" onClick={handleSubmit}>submit</button>
      </form>
      <p>Already Register,<span onClick={()=>{navigate("/login")}} id="register-bottom-navigate" >Sign In</span></p>
</div>
</div>
</div>
</>

    )
}



export default Register;