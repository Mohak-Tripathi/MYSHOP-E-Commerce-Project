import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../Components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../Components/Loader.jsx"
import Message from "../Components/Message.jsx"
import {useNavigate} from "react-router-dom"


const ProductScreen = () => {
  const { id } = useParams();

const [qty, setQty]= useState(1)

const navigate= useNavigate()
// console.log(qty)

  // const product = products.find((p) => p._id === id);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => {
    return state.productDetails;
  });

  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id])

  function addToCartHandler(){
    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        GO Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {" "}
                        {product.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}{" "}
                      </strong>
                    </Col>
                  </Row>

                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>  
                      <Col>Qty </Col>
                      <Col> 
                      
                      <Form.Control as= "select" value={qty} onChange={(e)=> {
                        return setQty(e.target.value)
                      } } >

                        {

                          [...Array(product.countInStock).keys()].map((x)=> {
                            return <option key = {x+1} value={x+1}> {x+1}</option>
                          })
                        }
                     
                     </Form.Control>
                     </Col>

                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                  onClick= {addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    {" "}
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
