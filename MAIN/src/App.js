import ProductList from './component/product';
import {Routes, BrowserRouter, Route} from "react-router-dom";
import './App.css';
import Product from "./component/productpage"
import Cart from './component/cart';
import Newproduct from "./admin/createproduct"
import AllProduct from "./admin/getproductlist"
import Updateproduct from './admin/updateproduct';
import Home from './component/Home';
import Register from './component/Register';
import Login from './component/login';
import Shipping from './component/order/Shipping';
import ConfirmOrder from './component/order/ConfirmOrder';
import { PrivateRoute } from './utils/privaterouter';
// import Paymentpage from './component/order/pay';
import Dashboard from './admin/Dashboard';
import Ordermanage from './admin/Ordermanage';
import Profile from './component/Profile';
import Editprofile from './component/Editprofile';

function App() {
  return (
    <div className="App">
  <BrowserRouter>
          <Routes>
              <Route  path="/product" element= {<ProductList/>} />
              <Route  path="/" element= {<Home/>} />
              <Route  path="/register" element= {<Register/>} />
              <Route  path="/login" element= {<Login/>} />
              <Route path="/profile" element={<Profile/>}/>
              {/* <Route exact path='/' element={<PrivateRoute/>}> */}
              {/* <PrivateRoute> */}
              <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>}/>
              <Route path="/cart/checkout" element={<PrivateRoute><Shipping/></PrivateRoute>}/>
              <Route path="/cart/checkout/confirmorder" element={<PrivateRoute><ConfirmOrder/></PrivateRoute>}/>
              <Route path="/newproduct" element={<PrivateRoute><Newproduct/></PrivateRoute>}/>
              <Route path="/productlist" element={<PrivateRoute><AllProduct/></PrivateRoute>}/>
              <Route  path="/product/:productid" element= {<PrivateRoute><Product/></PrivateRoute>} />
              <Route path="/updateproduct/:productid" element={<PrivateRoute><Updateproduct/></PrivateRoute>}/>
              <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
              <Route path="/order/orderlist" element={<PrivateRoute><Ordermanage/></PrivateRoute>}/>
<Route path="/profile/editprofile" element={<Editprofile/>}/>
              {/* <Route path="/pay" element={<Paymentpage/>}/> */}
           {/* </Route> */}
           {/* </PrivateRoute> */}
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
