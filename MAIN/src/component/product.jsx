import React, { useEffect,useState } from 'react';
import Paginate from './paginate';
import Header from './header';
import Example from './filter';
import {CartState} from "../utils/context"

export default function ProductList() {
    const [productData, setProductData] = useState([]);
    const [searchTerm , setsearchTerm]=useState("")
 
    const {
        productstate: { byStock, sort, bycategory,searchQuery }
      } = CartState();
 console.log(byStock, sort, bycategory,searchQuery)

    useEffect(()=>{
        let data;
        const fetchData = async ()=>{
            data = await fetch('http://localhost:8000/v1/product/allproduct').then(el=>el.json());
            // data.products = data.products.filter((el)=> el.title !== 'OPPOF19');
            setProductData(data.product);
            // console.log('Data inside useeffect', productData);
        }
        fetchData();
        // console.log(productData);

    },[])

const result=()=>{
let sortedproduct=productData

if(sort){
    sortedproduct=sortedproduct.sort((a,b)=>
        sort==="lowToHigh"?a.price-b.price:b.price-a.price
    )
}

if (!byStock) {
    sortedproduct = sortedproduct.filter((prod) => prod.Stock);
  }

if(bycategory){
    sortedproduct=sortedproduct.filter((prod)=>prod.category.includes(bycategory));
}

if (searchQuery) {
    sortedproduct = sortedproduct.filter((prod) =>
      prod.name.toLowerCase().includes(searchQuery)
    );
  }

  return sortedproduct;

}

// let result=productData.filter(user=>user.category.includes(searchTerm))
let turn=result()
console.log(turn)
  return (
<>
<Header/>

    <div className='productList'>
<Example/>
        {/* <div>
        <select onChange={(e)=>{setsearchTerm(e.target.value)}}>
        <option selected>choose</option>
        <option >smartphones</option>
        <option >laptops</option>
        <option>home-decoration</option>
        <option >groceries</option>
      </select>
        </div> */}
        {/* <section className='cards'>
        {productData.filter(user=>user.category.includes(searchTerm)).map((el)=>{
            return(
             
                <div className={`card product_${el.id}`}>
                    <div className="card_image">
                        <img src={el.images[0]} alt={el.title} />
                    </div>
                    <div className="card_content">
                    <h3>category:{el.category}</h3>
                        <h2>{el.title}</h2>
                        <p>{el.description}</p>
                        <h1>${el.price}</h1>
                    </div>
                </div>
            )
        })}
      
        </section> */}
        <Paginate data={turn}/>
    </div>
    </>
  )
}