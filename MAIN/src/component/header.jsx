import {NavLink, useNavigate,useLocation} from "react-router-dom"
import {FaShoppingCart ,FaOpencart} from "react-icons/fa";
import { CartState } from "../utils/context"
import "../css/productpage.css"
import{useState} from 'react'
import {Button,Container,Nav,Navbar,NavDropdown,Form,Dropdown} from 'react-bootstrap'
import image1 from '../images/googleplay.jpg'
import {CgProfile,CgLogOut}  from "react-icons/cg";
import "../css/header.css"
import {IoMdCloseCircle} from "react-icons/io";
import {SiShopify}  from "react-icons/si";

export default function Header(){

const navigate=useNavigate()
const location = useLocation();
const user = localStorage.getItem("token")
const {state:{cart},dispatch,productdispatch}=CartState()
const [toggle,settoggle]=useState(false)

const handlelogout=()=>{
  localStorage.removeItem("token")
}


    return(
      <>
       <Navbar bg="light" expand="lg">
       <Container fluid>
         <Navbar.Brand href="#"><SiShopify className="navbar-icon"/><span>ShopKart</span></Navbar.Brand>
         <Navbar.Toggle aria-controls="navbarScroll" />
         <Navbar.Collapse id="navbarScroll">
           <Nav
             className="me-auto my-2 my-lg-0"
             style={{ maxHeight: '100px' }}
             navbarScroll
           >
             <Nav.Link onClick={()=>{navigate("/")}}>Home</Nav.Link>
             <Nav.Link onClick={()=>{navigate("/product")}}>Products</Nav.Link>
             {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
               <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
               <NavDropdown.Item href="#action4">
                 Another action
               </NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item href="#action5">
                 Something else here
               </NavDropdown.Item>
             </NavDropdown> */}
              {/* <Nav.Link href="#action2">About</Nav.Link>
             <Nav.Link href="#" disabled>
               Link
             </Nav.Link> */}
           </Nav>
           {location.pathname === '/product' && 
           <Form className="d-flex">
             <Form.Control
               type="search"
               placeholder="Search"
               className="me-2"
               aria-label="Search"
               onChange={(e)=>productdispatch({
                type:"FILTER_BY_SEARCH",
                payload:e.target.value
              })

               }
             />
           </Form>
}
           {/* <div onClick={()=>{navigate("/cart")}}><FaShoppingCart/>{cart.length}</div> */}
           &nbsp;      &nbsp;      &nbsp;
           {
            user?
           <Nav.Link onClick={()=>{navigate("/cart")}}><FaShoppingCart className="cart-icon"/>{cart.length}</Nav.Link>:
           null}
       
          
           
           {/* <Nav.Link onClick={()=>{navigate("/profile")}}><CgProfile className="profile-icon"/></Nav.Link> */}
  
           {/* <CgProfile className="profile-icon"  onClick={setdropdown(true)}/> */}
       {/* {
        dropdown==true?<ul id="header-drop">
          <li>uhh</li>
          <li>ji</li>
        </ul>
        :null
       } */}
           {/* <NavDropdown title={
                        <img style={{width:"50px" ,height:"50px", borderRadius:"50%"}}
                            src={image1} 
                            alt="user pic"
                        />
                   } ></NavDropdown> */}

{
     user?
 <div class="dropdown">
  {/* <button class="dropbtn">Dropdown</button> */}
  

  
  <CgProfile id="profile-icon"  className="dropbtn" onClick={()=>{settoggle(true)}} />

  {
    toggle==true?  <div class="dropdown-content" style={{display:!toggle ? "none":"block"}}  onClick={()=>{settoggle(false)}}  >
   <Nav.Link onClick={()=>{navigate("/profile")}}><FaOpencart className="dropdown-menu-icon"/></Nav.Link>
   <Nav.Link onClick={handlelogout}><CgLogOut className="dropdown-logout-icon"/></Nav.Link>
   <IoMdCloseCircle className="dropdown-close-icon" onClick={()=>{settoggle(false)}}/>
  </div>:null
  }



</div>:
<NavLink to={"/login"} ><button style={{"color":"green","background":"transparent","textDecoration":"none","border":"none"}} id="headerlogin-button"><b>Login</b></button></NavLink>
} 


       
         </Navbar.Collapse>
       </Container>
     </Navbar>
     </>
    )
}