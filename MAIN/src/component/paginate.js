import {useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import {Card,Col,Row,ListGroup,Container} from 'react-bootstrap';


export default function Paginate(props){
const {data} =props
const [searchTerm , setsearchTerm]=useState("")
const [itemOffset, setItemOffset] = useState(0);
const [currentitem,setcurrentitem]=useState([])
const [pagecount,setpagecount]=useState(0)
const itemsPerPage=6;
// const rdata=data.filter(user=>user.category.includes(searchTerm))

// console.log(data.filter(user=>user.category.includes(searchTerm)))
// console.log(currentitem)
// console.log(searchTerm)
// console.log(rdata)
useEffect(()=>{
    const endOffset = itemOffset + itemsPerPage;
    setcurrentitem(data.slice(itemOffset, endOffset))
    setpagecount(Math.ceil(data.length / itemsPerPage))
   
},[itemOffset,itemsPerPage,data])

// console.log(`Loading items from ${itemOffset} to ${endOffset}`);
// const currentItems = 
// const pageCount = ;

// Invoke when user click to request another page.
const navigate=useNavigate()
const nextpage=(id)=>{
  navigate("/product/"+id)
}




const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % data.length;
  console.log(
    `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
  setItemOffset(newOffset);
};

return (
  <>

  {/* <div>
  <select onChange={(e)=>{setsearchTerm(e.target.value)}}>
  <option selected>choose</option>
  <option >smartphones</option>
  <option >laptops</option>
  <option>home-decoration</option>
  <option >skincare</option>
</select>
  </div> */}
    {/* <section className='cards'>
{
  

    currentitem.map(el=>{
        return(
            <div className={`card product_${el.id}`}>
            <div className="card_image">
                <img src={el.images[0]} alt={el.title} onClick={()=>nextpage(el.id)}/>
            </div>
            <div className="card_content">
            <h3>category:{el.category}</h3>
                <h2>{el.title}</h2>
                <p>{el.description}</p>
                <h1>₹{el.price}</h1>
            </div>
        </div>
        )
    })
}
</section> */}
<Container>
 <div className='row-product-home'>
      {currentitem.map((el, idx) => (
       
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
     
      ))}
    </div>
    </Container>
    {/* <Items currentItems={currentItems} /> */}
    <div className="paginationBox">
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={6}
      pageCount={pagecount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      pageLinkClassName='page-item'
      previousLinkClassName='page-item'
      nextLinkClassName='page-item'
      activeLinkClassName='pageItemActive'
      itemClass="page-item"
    />
    </div>
  </>
);

}
