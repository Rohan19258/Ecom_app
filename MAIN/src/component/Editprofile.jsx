import React,{useState} from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import "../css/editprofile.css"

const Editprofile = () => {

  const navigate=useNavigate()
  const [email,setemail]=useState("")
  const [city,setcity]=useState("")
  const [address,setaddress]=useState("")
  const [phonenum,setphonenum]=useState()
  const[pincode,setpincode]=useState()
  
  const shippingdeal={
    "address":address,
    "city":city,
    "pincode":pincode,
    "phoneNo":phonenum
  }

 localStorage.setItem("shipdeal",JSON.stringify(shippingdeal))

  return (
<>

<div id="editprofile-section">
  <h2 id="editprofile-heading">Profile Details</h2>
{/* <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        // className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
  
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel> */}

    
<FloatingLabel
        controlId="floatingInput"
        label="Shipping Address"
   
      >
        <Form.Control placeholder="name@example.com"    value={address}  onChange={(e) => setaddress(e.target.value)}/>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="city"
     
      >
        <Form.Control placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="PinCode"
     
      >
        <Form.Control type="number" maxnum="10"placeholder="name@example.com" value={pincode} onChange={(e) => setpincode(e.target.value)} />
 
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Phone Number"
     
      >
        <Form.Control type="number" maxnum="10"placeholder="name@example.com" value={phonenum}  onChange={(e) => setphonenum(e.target.value)} />
 
      </FloatingLabel>
<br></br>
      <Button variant="outline-success" onClick={()=>{navigate(-1)}}>Save</Button>{' '}

      </div>
      <div>

      </div>
    


</>
  )
}

export default Editprofile