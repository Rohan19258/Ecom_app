import React, { Fragment } from "react";
// import CheckoutSteps from "../Cart/CheckoutSteps";
// import { useSelector } from "react-redux";
// import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import {useNavigate,Link } from "react-router-dom";
import { CartState } from "../../utils/context";
import axios from'axios'

// import Paymentpage from "./pay";
// import { Typography } from "@material-ui/core";

const ConfirmOrder = () => {
const navigate=useNavigate()
const {state:{cart},dispatch}=CartState()

  // const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  // const { user } = useSelector((state) => state.user);
console.log(cart)
  // const subtotal = cart.reduce(
  //   (acc, item) => acc + item.quantity * item.price,
  //   0
  // );

  const subtotal =  cart.reduce((acc,curr)=>acc+Number(curr.price)*curr.qty,0)


  console.log(subtotal)

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = Math.round(subtotal * 0.18);

  const totalPrice = Math.round(subtotal + tax + shippingCharges);

  // const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
const getitem=localStorage.getItem("shippinginfo")

const shippingdetail=JSON.parse(getitem)

console.log(shippingdetail)
const mail=localStorage.getItem("email")
const name=mail.split('@')[0]

// const shippingdeal={
//   address:"fjkfjko",
//   phoneNo:54656566,
//   city:"jifhdfh",
//   pinCode:564554564
// }

// console.log(shippingdetail.phoneNo)

  const proceedToPayment = () => {
   let payment=document.getElementById('paymentmainsection')
   payment.style.display="block";

  };

const orderplaced=()=>{
  const config={
    headers:{
      "Content-type":"application/json",
      "authentication": localStorage.getItem("token"),
      "auth":localStorage.getItem("email")
    }
}
const orderdata={
  ShippingInfo:shippingdetail,
  orderItems:cart,
  itemsPrice:subtotal,
  taxPrice:tax,
  shippingPrice:shippingCharges,
  totalPrice:totalPrice
}
console.log(orderdata)
  axios.post("http://localhost:8000/v1/order/createorder",orderdata,config).then(res=>{
    // console.log(res)
    alert("Orderplaced Successfully")
    navigate("/profile")
    let payment=document.getElementById('paymentmainsection')
    payment.style.display="none";
  }).catch(error=>{
    console.log(error)
    let payment=document.getElementById('paymentmainsection')
    payment.style.display="none";
  })
}


  return (
    <Fragment>
      {/* <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} /> */}
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
                      <h2> Shipping Info</h2>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingdetail.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{shippingdetail.address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <h2>Your Cart Items:</h2>
            <div className="confirmCartItemsContainer">
              {
                cart.map((item) => (
                  <div >
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.title}`}>
                      {item.title}
                    </Link>{" "}
                    <span>
                      {item.qty} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.qty}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
         <h2>Order Summery</h2> 
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
      <div id="paymentmainsection">
      <div id="paymainpart">
    <div>
    <span><b>Payment:</b></span>&nbsp;&nbsp;
<span style={{color:"red"}}>Cash On Delivery</span>
</div>
<button onClick={orderplaced}><b>Place Order</b></button>
</div>
</div>
    </Fragment>
  );
};

export default ConfirmOrder;
