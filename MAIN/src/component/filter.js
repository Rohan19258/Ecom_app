import React, { useState } from 'react';
import {Button,Form} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CartState } from "../utils/context";

export default function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const category=["smartphone","Camera","laptop","Attire"]
  const {
    productdispatch,
    productstate: { byStock, sort, bycategory},
  } = CartState();
// console.log( byStock, sort, bycategory)
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      Filter
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>FILTER</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <h2>SORT</h2>
        <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() =>
            productdispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() =>
            productdispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <h2>BY STOCK</h2>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() =>
            productdispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
      </span>
    
 <h1>category</h1>
   <div>
   <Form.Check
   inline
   label="smartphones"
   name="group2"
   type="radio"
   id={`inline-4`}
   onChange={()=>productdispatch({
       type:"FILTER_BY_CATEGORY",
       payload:"SmartPhones"
     })
   }
   checked={bycategory === "smartphones" ? true : false}
   />
 </div>
 <div>
   <Form.Check
   inline
   label="laptops"
   name="group2"
   type="radio"
   id={`inline-5`}
   onChange={()=>productdispatch({
       type:"FILTER_BY_CATEGORY",
       payload:"Laptop"
     })
   }
   checked={bycategory === "laptops" ? true : false}
   />
 </div>
 <div>
   <Form.Check
   inline
   label="Camera"
   name="group2"
   type="radio"
   id={`inline-6`}
   onChange={()=>productdispatch({
       type:"FILTER_BY_CATEGORY",
       payload:"Camera"
     })
   }
   checked={bycategory === "Camera" ? true : false}
   />
 </div>
 <div>
   <Form.Check
   inline
   label="	Attire"
   name="group2"
   type="radio"
   id={`inline-7`}
   onChange={()=>productdispatch({
       type:"FILTER_BY_CATEGORY",
       payload:"Attire"
     })
   }
   checked={bycategory === "Attire" ? true : false}
   />
 </div>

<br></br>
      <Button
        variant="success"
        onClick={() =>
          productdispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

