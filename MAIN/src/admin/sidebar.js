import React from 'react'
import {useState} from 'react'
import { NavLink } from 'react-router-dom';
import "../css/sidebar.css"
import {HiOutlineViewList} from 'react-icons/hi'
import {RiLogoutBoxFill,RiDashboardFill} from "react-icons/ri"
import {IoCreate } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";


const Sidebar = () => {

    const [isExpanded, setExpendState] = useState(false);
	const menuItems = [
		{
			text: "Dashboard",
			icon: <RiDashboardFill className="side-icon-sidebar"/>,
            path:"/admin/dashboard"
		},
		{
			text: "Create Product",
			icon: <IoCreate className="side-icon-sidebar"/>,
            path:"/newproduct"
		},
		{
			text: "Products",
			icon: <FaProductHunt className="side-icon-sidebar"/>,
            path:"/productlist"
		},
		{
			text: "Orders",
			icon: <BsFillCartCheckFill className="side-icon-sidebar"/>,
            path:"/order/orderlist"
		},
		{
			text: "Saved Items",
			icon:<HiOutlineViewList/>,
		},
		{
			text: "Settings",
			icon:<HiOutlineViewList/>,
		},
	];
  return (
    <>
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
                    <h2>Showkart</h2>
                </div>
            )}
            <button
                className={
                    isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
                }
                onClick={() => setExpendState(!isExpanded)}
            >
                <span><HiOutlineViewList/></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <div className="nav-menu">
            {menuItems.map(({ text, icon,path }) => (
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
            <RiLogoutBoxFill  className="footer-icon-sidebar"  />
          
    </div>
</div>
<div>

</div>
</>
  )
}

export default Sidebar