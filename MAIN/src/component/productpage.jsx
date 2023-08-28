import '../css/productpage.css'
import Header from './header';
import {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { CartState } from '../utils/context';
import {useNavigate}from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';


export default function Product(){
const [name,setname]=useState("Add to cart")
const {productid}=useParams();
const [productData,setProductData]=useState([]);
const [des,setdes]=useState()
const [category,setcategory]=useState()
const [title,settitle]=useState()
const [price,setprice]=useState()
const[image1,setimage1]=useState()
const[image2,setimage2]=useState()
const[image3,setimage3]=useState()
const[stock,setstock]=useState()
const additem=()=>{
  setname("Item added")
}

const navigate=useNavigate()

const {
  state: { cart },
  dispatch
} = CartState();

// console.log(cart)

// const [index, setIndex] = useState(0);

// const handleSelect = (selectedIndex, e) => {
//   setIndex(selectedIndex);
// };


useEffect(()=>{
  let data;
  const fetchData = async ()=>{
      data = await fetch(`http://localhost:8000/v1/product/singleproduct/${productid}`).then(el=>el.json())
      let res=data.product
      // setProductData(res.product)
      console.log(res)
setdes(res.description)
setimage1(res.images[0].url)
setimage2(res.images[1].url)
setimage3(res.images[2].url)
setcategory(res.category)
settitle(res.name)
setprice(res.price)
setstock(res.Stock)
  }
  fetchData();

},[])


const note={
id:productid,
 image:image1,
 title:title,
 price:price,
 instock:stock
}





return(
<>
<Header/>
<main className="container">

{/* {
  array.map(prod=>{
    return(
      <> */}
      <div className="left-column">
      {/* <img data-image="black" src={image1} alt="next"/>
      <img data-image="blue" src={image2} alt="next"/>
      <img data-image="red" className="active" src={image3} alt="next"/> */}

<Carousel>
      <Carousel.Item>
        <img
       
          className="d-block w-100"
          src={image1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100" 
          src={image2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </div> 
    <div className="right-column">


<div className="product-description">
  <span>{category}</span>
  <h1>{title}</h1>
  <p>{des}</p>
</div>


{/* <div className="product-configuration">

 
  <div className="product-color">
    <span>Color</span>

    <div className="color-choose">
      <div>
        <input data-image="red" type="radio" id="red" name="color" value="red" checked/>
        <label for="red"><span></span></label>
      </div>
      <div>
        <input data-image="blue" type="radio" id="blue" name="color" value="blue"/>
        <label for="blue"><span></span></label>
      </div>
      <div>
        <input data-image="black" type="radio" id="black" name="color" value="black"/>
        <label for="black"><span></span></label>
      </div>
    </div>

  </div>


  <div className="cable-config">
    <span>Cable configuration</span>

    <div className="cable-choose">
      <button>Straight</button>
      <button>Coiled</button>
      <button>Long-coiled</button>
    </div>


  </div>
</div> */}


<div className="product-price">
  <span>₹{price}</span>
  {cart.some((p) => p.id === productid) ? (
            <button className="cart-btn" 

              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: note,
                })
              }
            >
              Remove from Cart
            </button>
          ) : (
            <button className="cart-btn" 
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: note,
                })
              }
              disabled={!stock}
            >
              {!stock ? "Out of Stock" : "Add to Cart"}
            </button>
          )}
  {/* <button  className="cart-btn" onClick={additem}>{name}</button> */}
</div>
</div>

    {/* </>
    )
  })
} */}

</main>
</>
)


}
