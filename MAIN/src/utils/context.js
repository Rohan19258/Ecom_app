import { createContext,useContext ,useReducer,useState,useEffect} from "react";
import { cartReducer,productReducer } from "./reducer";



const Cart=createContext()


const Context=({children})=>{

// const [product,setproduct]=useState()


//     let data;

//         data =  fetch('https://dummyjson.com/products').then(el=>el.json());

//         setproduct(data.products);
//         // console.log('Data inside useeffect', productData);

let initialstate=[]

// const getlocalcartdata=()=>{
//   let cartitem=localStorage.getItem("cartitme2")
//   let cartdata=JSON.parse(cartitem)
//   if(cartdata){
//     return cartdata
//   }else{
//     return []
//   }

// }
// useEffect(()=>{
//   let token =localStorage.getItem('token')
//   if (token){
//     const getcartitem = async () => {
//       let data = await fetch("http://localhost:8000/v1/order/getcartitem", {
//           method: "GET",
//           headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//               "authentication": localStorage.getItem("token"),
//               "auth": localStorage.getItem("email")
//           },
//       })
//       let res = await data.json()
//       // console.log(res)
//       localStorage.setItem("cartitem2",JSON.stringify(res.cart))
//   }
//   getcartitem()
//   }

  
// })

// const email= localStorage.getItem("email")
// const carte=localStorage.getItem(email)
// if(carte){
//  localStorage.setItem("cartitem2",carte)
// }

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("cartitem2");

  if (localCartData === [] || localCartData=== null) {
    return   localStorage.setItem('cartitem2', JSON.stringify([]));;
  } else {
    return JSON.parse(localCartData);
  }
};

const [state, dispatch] = useReducer(cartReducer, {

  cart: getLocalCartData(),
});



  // const getstoreditem=JSON.parse(localStorage.getItem("cartitem2")) 
  // console.log(getstoreditem)

 

 
// let localcartdata=localStorage.getItem("cartitme2")
// let cartdata=JSON.parse(localcartdata)
//    console.log(cartdata)


// console.log(state.cart)

const [productstate,productdispatch]=useReducer(productReducer,{
  byStock: false,
  bycategory:"",
  searchQuery: "",
})



useEffect(()=>{
  localStorage.setItem("cartitem2",JSON.stringify(state.cart))
  },[state.cart])

return (
    <Cart.Provider value={{ state, dispatch ,productstate,productdispatch}}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;



