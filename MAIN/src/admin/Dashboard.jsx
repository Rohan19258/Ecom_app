import React from 'react'
import { Link } from 'react-router-dom'
import {useState,useEffect} from 'react'
import "../css/dashboard.css"
import Table from 'react-bootstrap/Table';
import userimage from "../images/ios.png"
import Sidebar from './sidebar'
import {FcOk} from 'react-icons/fc'
import { RiUser4Line } from 'react-icons/ri';

const Dashboard = () => {

const [allorder,setallorder]=useState([])

let orderuser=""
let orderdate=""
	useEffect(()=>{
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
getorders()
	},[])


  return (
<>
<div id="admin-dashboard-sidebar">
  <Sidebar/>
  </div>
<section id="admin-dashboard-main-section">
<div className="admin-nav">
<div>
<h2>Admin Dashboard</h2>
</div>
<div id="admin-nav-userimg">
<img src={userimage} alt="next"/>
<span>user</span>
</div>
</div>
<section id="admin-dashboard-boxcontent">
<div class="admin-dashboard-minibox">
<FcOk className='fc-ok'/>
<span>
	<h3>452</h3>
	<p>New Order</p>
</span>
</div>
<div class="admin-dashboard-minibox">
<FcOk className='fc-ok'/>
<span>
	<h3>452</h3>
	<p>New Order</p>
</span>
</div>
<div class="admin-dashboard-minibox">
<FcOk className='fc-ok'/>
<span>
	<h3>452</h3>
	<p>New Order</p>
</span>
</div>
</section>
<section id="admin-dashboard-orderbox">
<h1>Recent Order</h1>
<Table id="admin-ordertable" responsive>
						<thead>
							<tr>
								<th>User</th>
								<th>Date Order</th>
								<th>Status</th>
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
							
							</tr>
                   )
								})
							}
							{/* <tr>
								<td>
									<img src="img/people.png"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span className="status completed">Completed</span></td>
							</tr> */}
              </tbody>
					</Table>
</section>
</section>
</>
  )
}

export default Dashboard