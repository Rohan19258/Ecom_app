import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import "../css/sidebar.css"
import { HiOutlineViewList } from 'react-icons/hi'
import { RiLogoutBoxFill, RiEditBoxFill, RiHome4Fill } from "react-icons/ri"
import { IoCreate } from "react-icons/io5";
import { FaProductHunt, FaEdit } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import "../css/profile.css"
import Table from 'react-bootstrap/Table';

const Profile = () => {
    const [isExpanded, setExpendState] = useState(false);
    const [allorder, setallorder] = useState([])

    let orderuser = ""
    let orderdate = ""

    const menuItems = [
        {
            text: "Home",
            icon: <RiHome4Fill className="side-icon-sidebar" />,
            path: "/"
        },
        {
            text: "Edit Profile",
            icon: <RiEditBoxFill className="side-icon-sidebar" />,
            path: "/profile/editprofile"
        },
        {
            text: "Orders",
            icon: <BsFillCartCheckFill className="side-icon-sidebar" />,
            path: "/profile"
        },
    ];

    useEffect(() => {
        const getorders = async () => {
            let data = await fetch("http://localhost:8000/v1/order/getuserorder", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "authentication": localStorage.getItem("token"),
                    "auth": localStorage.getItem("email")
                },
            })
            let res = await data.json()
            // console.log(res)
            setallorder(res.order)
        }
        getorders()
    }, [])

const handlelogout=()=>{
    // const email=localStorage.getItem("email")
    // const cartdata=localStorage.getItem("cartitem2")
    // localStorage.setItem(email,cartdata)
    localStorage.removeItem("token")
    // localStorage.setItem("cartitem2",JSON.stringify([]))

}

    return (
        <>
            <section id="admin-dashboard-sidebar">
                <div
                    className={
                        isExpanded
                            ? "side-nav-container"
                            : "side-nav-container side-nav-container-NX"
                    }
                >
                    <div className="nav-upper">
                        <div className="nav-heading">
                            {isExpanded && (
                                <div className="nav-brand">
                                    <box-icon type='solid' name='shopping-bags'></box-icon>
                                    <h2>Shopkart</h2>
                                </div>
                            )}
                            <button
                                className={
                                    isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
                                }
                                onClick={() => setExpendState(!isExpanded)}
                            >
                                <span><HiOutlineViewList /></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                        <div className="nav-menu">
                            {menuItems.map(({ text, icon, path }) => (
                                <NavLink to={path} className={isExpanded ? "menu-item" : "menu-item menu-item-NX"} >
                                    {/* <img className="menu-item-icon" src={icon} alt="" srcset="" /> */}
                                    <span className="menu-item-icon">{icon}</span>&nbsp;
                                    {isExpanded && <p>{text}</p>}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    <div className="nav-footer">
                        {isExpanded && (
                            <div className="nav-details">
                                {/* <img
                    className="nav-footer-avatar"
                    src="icons/admin-avatar.svg"
                    alt=""
                    srcset=""
                /> */}

                                <div className="nav-footer-info">
                                    {/* <p className="nav-footer-user-name">Logout</p> */}
                                    {/* <p className="nav-footer-user-position">store admin</p> */}
                                </div>
                            </div>
                        )}
                       <NavLink to={"/login"} ><RiLogoutBoxFill className="footer-icon-sidebar" onClick={handlelogout}/>
                       </NavLink>

                    </div>
                </div>
                <div>
                </div>
            </section>
            <section id="admin-dashboard-main-section">
                <Table responsive id="profile-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th> Order Item</th>
                            <th>Date Order</th>
                            <th>Status</th>
                            <th>Shipping Price</th>
                            <th>Tax Price</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allorder.map((elem) => {
                                orderuser = elem.user.split("@")
                                orderdate = elem.createdAt.split("T")
                                return (
                                    <tr>
                                        <td>
                                            {/* <img src="img/people.png"/> */}
                                            <p >{orderuser[0]}</p>
                                        </td>
                                        <td>
                                            <Table striped bordered hover variant="light">
                                                <thead>
                                                    <tr>
                                                        <th>Item</th>
                                                        <th>Item Name</th>
                                                        <th>Item Price</th>
                                                        <th>Item Qty</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        elem.orderItems.map((data) =>
                                                            <tr>
                                                                <td><img src={data.image} alt="next" style={{ width: "50px", height: "50px" }} /></td>
                                                                <td>{data.title}</td>
                                                                <td>{data.price}</td>
                                                                <td>{data.qty}</td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </Table >
                                        </td>
                                        <td>{orderdate[0]}</td>
                                        {
                                            elem.orderStatus === "Processing" ?
                                                <td><span className="status process">{elem.orderStatus}</span></td> :
                                                <td><span className="status completed">{elem.orderStatus}</span></td>
                                        }
                                        <td>{elem.shippingPrice}</td>
                                        <td>{elem.taxPrice}</td>
                                        <td>{elem.totalPrice}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>
            </section>
        </>
    )
}

export default Profile