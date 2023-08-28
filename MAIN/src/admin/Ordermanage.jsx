import React from 'react'
import {useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import { RiDeleteBinFill } from 'react-icons/ri';
import { CiEdit } from "react-icons/ci";
import "../css/ordermanage.css"
import { ToastContainer,toast} from 'react-toastify';
import axios from 'axios'

const Ordermanage = () => {

    const [allorder,setallorder]=useState([])

    let orderuser=""
let orderdate=""

const getorders=async()=>{
  let data=await fetch("http://localhost:8000/v1/order/getallorder",{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "authentication": localStorage.getItem("token"),
        "auth":localStorage.getItem("email")
      },
  })
  let res=await data.json()
  // console.log(res)
setallorder(res.order)
}
	useEffect(()=>{
     
        getorders()   
            },[])

   const updateorder=async(id)=>{
const formdata={
  orderStatus:"Delivered"
}

   axios.put(`http://localhost:8000/v1/order/updateorder/${id}`,formdata,{
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "authentication": localStorage.getItem("token"),
        "auth":localStorage.getItem("email")
      },
    }).then(res=>{

console.log(res)
toast.success("Order updated successfully", {
  theme: "colored",
  position: toast.POSITION.BOTTOM_CENTER
})
getorders()
    }).catch(err => {
  
      console.error(err);
  });
// const res=await update.json()


   }         

const deleteorder=async(id)=>{
const orderdata=await fetch(`http://localhost:8000/v1/order/deleteorder/${id}`,{
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "authentication": localStorage.getItem("token"),
      "auth":localStorage.getItem("email")
    },
})
const response=await orderdata.json()
console.log(response)
if(response.message==="user is not allowed to access this resources"){
    toast.error("user is not allowed to access this resources", {
        theme: "colored",
        position: toast.POSITION.BOTTOM_CENTER

      })
}

}

  return (
<>
<ToastContainer />
<Table id="orderlist-ordertable" responsive>
						<thead>
							<tr>
								<th>User</th>
								<th>Date Order</th>
								<th>Status</th>
                                <th>Action</th>
							</tr>
						</thead>
						<tbody>
							{
								allorder.map((elem)=>{
						orderuser=elem.user.split("@")
						orderdate=elem.createdAt.split("T")
                      return (
                              <tr>    
								<td>
									{/* <img src="img/people.png"/> */}
									<p >{orderuser[0]}</p>
								</td>
								<td>{orderdate[0]}</td>
								{
									elem.orderStatus==="Processing"?
									<td><span className="status process">{elem.orderStatus}</span></td>:
									<td><span className="status completed">{elem.orderStatus}</span></td>
								}
							<td  ><RiDeleteBinFill  className="orderlist-deleteicon" onClick={()=>deleteorder(elem.id)}/> 
              {elem.orderStatus==="Processing"? <CiEdit className="orderlist-deleteicon"   onClick={()=>updateorder(elem._id)}/>:null}
             </td>
							</tr>
                   )
								})
							}

						
              </tbody>
					</Table>
</>
  )
}

export default Ordermanage