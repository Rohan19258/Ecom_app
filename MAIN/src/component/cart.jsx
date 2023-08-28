import { useEffect, useState, } from "react";
import { Button, Col, Form, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../utils/context";
import "../css/cart.css"
import Header from "./header";
import {useNavigate} from "react-router-dom"


export default function Cart(){

const {state:{cart},dispatch}=CartState()

// console.log(cart)
// if(cart.length==0){
// Button.disabled=true
// }
let flag;
if(cart.length==0){
flag=true
}


localStorage.setItem("cartitem",JSON.stringify(cart))


const[total,settotal]=useState()

useEffect(()=>{
settotal(cart.reduce((acc,curr)=>acc+Number(curr.price)*curr.qty,0))
},[cart])

const navigate=useNavigate()

const nextpage=()=>{

if(cart.length>0){
navigate("/cart/checkout")
}else{
  alert("Add item first")
}
}

return(
<>
<Header/>

<div className="cartmain">
    <div className="pcontainer">
{/* <ListGroup>
{
    cart.map(prod=>{
        return(
            <ListGroup.Item>
            <Row >
                <Col>
                <Image src={prod.image} alt="next" thumbnail style={{height:"100px", width: "100px"}}/>
                </Col>
                <Col >
                <div>{prod.title}</div>
                </Col>
                <Col>
               <div>&#8377;{prod.price}</div> 
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.instock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
            </Row>
        </ListGroup.Item>
        )
    

    })
}    
</ListGroup> */}
{
    cart.map(prod=>{
        return(
<div id="cartcard">
<div className="img-cart" >
  {/* <Col> */}
   <img src={prod.image} alt="next" thumbnail    style={{height:"100px", width: "100px"}}/>
   {/* </Col> */}
   </div>
   <div id="cartcard-mid">
 
   <div>{prod.title}</div>
   <div>&#8377;{prod.price}</div> 
   <div>
   <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.instock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                  </div>
   </div>

<div id="cart-remove-button">
<Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                  </div>
</div>
       )
    

      })
  } 
    </div>
    
    <div className="filt">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span className="cart-total">Total: ₹ {total}</span>
        <Button type="button" onClick={nextpage}  >
           Checkout
        </Button>
      </div>
</div>



</>
)

 }




