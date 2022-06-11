import React from "react";
import {useState, useEffect} from "react";
import axios from "axios"; 

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../Components/Rating";


const ProductScreen = () => {
  const { id } = useParams();

  // const product = products.find((p) => p._id === id);

  const [product, setProduct] = useState({})


 useEffect(()=>{
const fetchProduct = async () =>{
  const {data} = await axios.get(`http://localhost:5000/api/products/${id}`)

  setProduct(data)
}
fetchProduct()

 },[id])

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        GO Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <h4> Price: ${product.price} </h4>
            </ListGroup.Item>
            <ListGroup.Item className='my-3'>
              Description : {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant='fluid'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                  <strong>  
                  ${product.price}
                  </strong>
                  
                  </Col>
                </Row>
              </ListGroup.Item>


              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                  
                 <strong>    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}      </strong>
                </Col>

                </Row>
              </ListGroup.Item>

              <ListGroup.Item>

<Button className="btn-block" type="button" disabled={product.countInStock ===0 }> Add To Cart</Button>

              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>



      </Row>
    </>
  );
};

export default ProductScreen;
