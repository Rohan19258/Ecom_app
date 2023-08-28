import Header from "./header";
import "../css/home.css"
import Carousel from 'react-bootstrap/Carousel';
import {Row,ListGroup,Card,Container} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import {useState,useEffect} from 'react'
import Footer from "./footer";
import image1 from "../images/pic1.jpg"
import image2 from "../images/pic2.jpg"
import image3 from "../images/pic3.jpg"
import { useNavigate } from "react-router-dom";



 const Home=()=>{

    const [product,setproduct]=useState([])

    const getproduct=async()=>{
const res=await fetch("http://localhost:8000/v1/product/limitproduct")
const data=await res.json()
setproduct(data.product)
    }

    useEffect(()=>{
getproduct()
    },[])

    const navigate=useNavigate()
const nextpage=(id)=>{
  navigate("/product/"+id)
}


    return(
<>
<Header/>

<div className="Home-top">
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
<br></br>
{/* <Row>
 <Col md={{ span: 3, offset: 5 }}><h3>Feature Product</h3></Col>
  </Row> */}
  <h1 style={{textAlign: "center"}}>Feature Product</h1>
  <br></br>
  <Container>
  {/* <Row xs={1} md={4} className="g-4"> */}
    <div className="row-product-home">
      {product.map((el, idx) => {

        return(
        // <Col>
          <Card>
            <Card.Img variant="top" src={el.images[0].url} className="card-img"  onClick={()=>nextpage(el._id)}/>
            <Card.Body>
              <Card.Title>{el.name}</Card.Title>
              <Card.Text>
              {el.description.slice(0,60)+"..."}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
        <ListGroup.Item>₹{el.price}</ListGroup.Item>
      </ListGroup>
          </Card>
        // </Col>
        )
 })
      }
          </div>
    {/* </Row> */}

    </Container>
 <Footer/>
</>
    )
}



export default Home;