import React, { useEffect, useState } from "react";
import "../css/createproduct.css"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";


export default function Updateproduct(){

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
  const {productid}=useParams()
  const Navigate=useNavigate();
    const categories = [
      "Laptop",
      "Footwear",
      "Bottom",
      "Tops",
      "Attire",
      "Camera",
      "SmartPhones",
    ];


    const getProduct =async() => {
        const response =  await fetch(`http://localhost:8000/v1/product/singleproduct/${productid}` ,  {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "authentication": localStorage.getItem("token"),
              "auth":localStorage.getItem("email")
            },
          });
        let result= await response.json();
// console.log(product.product.Stock)
        setName(result.product.name);
       
        setDescription(result.product.description);
        setPrice(result.product.price);
       
        setCategory(result.product.category);
        setStock(result.product.Stock);
        setOldImages(result.product.images);
        }

useEffect(()=>{
    getProduct()
},[])


    const createProductSubmitHandler = (e) => {
        e.preventDefault();
    
const note={
  name:name,
  price:price,
  description:description,
  category:category,
  Stock:Stock,
images:images

}

console.log(note)
console.log(imagesPreview)
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);
    
        images.forEach((image) => {
          myForm.append("images", image);
        });
        // dispatch(createProduct(myForm));
        // console.log(myForm)
        if(myForm){
        axios.post(`http://localhost:8000/v1/product/updateproduct/${productid}`,myForm,{
            method: "POST",
            "Content-Type": "multipart/form-data"
        }).then(res=>{
     alert("posted successfully")
   }).catch((error) => console.log(error));
}else{
    alert("invalid input")

   }
      };
    


    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    console.log(files)
        setImages([]);
        setOldImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };

    return(
<>

      <div className="dashboard">
     
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
           
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
     
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
       

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
    
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value={category} selected>{category}</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
      
              <input
                type="number"
                placeholder="Stock"
                required
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <button
              id="createProductBtn"
              type="submit"
         
            >
              update
            </button>
          </form>
        </div>
      </div>
</>
    )
}


