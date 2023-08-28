import {useState,useEffect} from 'react'
import {Table,Container,colSpan} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import { AiFillDelete,AiFillEdit } from "react-icons/ai";

const AllProduct=()=>{
const [item,setitem]=useState([])
const Navigate=useNavigate()

const getproduct=async()=>{
const Product=await fetch("http://localhost:8000/v1/product/allproduct")
const result=await Product.json()
console.log(result.product)
setitem(result.product)
}

useEffect(()=>{
  getproduct()
},[])


const updateproduct=(id)=>{
Navigate("/updateproduct/"+id)
}


const deleteproduct=async(id)=>{
const response=await fetch(`http://localhost:8000/v1/product/deleteproduct/${id}`,{
  method:"DELETE",
  headers:{
    Accept: "application/json",
    "Content-Type": "application/json",
  }
})
const data=response.json()
getproduct()
}

    return(
        <>

<Table responsive="lg" striped bordered hover>
      <thead>
        <tr>
          <th md={3} >Name</th>
          <th md={3}   >Category</th>
          <th  md={3}   >Stock</th>
          <th  md={3}  >Action</th>
        </tr>
      </thead>
      <tbody>
        {
          item.map(elem=>{
            return(
            <tr>
          <td>{elem.name}</td>
          <td>{elem.category}</td>
          <td>{elem.Stock}</td>
    
          <td><button onClick={()=>deleteproduct(elem._id)}><AiFillDelete/></button>&nbsp;&nbsp;&nbsp;<button onClick={()=>updateproduct(elem._id)}><AiFillEdit/></button></td>
          </tr>
            )
          })
        }
     
        </tbody>
    </Table>
 
        </>
    )
}


export default AllProduct;