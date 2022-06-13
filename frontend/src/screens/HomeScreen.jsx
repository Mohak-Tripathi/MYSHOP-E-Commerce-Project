import React from 'react'
import {useEffect} from "react";
import { Row,Col } from 'react-bootstrap'
import Product from "../Components/Product"
import { useDispatch, useSelector } from 'react-redux';
import {listProducts} from "../actions/productActions.js"
import Message from "../Components/Message.jsx"
import Loader from "../Components/Loader.jsx"

const HomeScreen = () => {

const dispatch = useDispatch()

const productList = useSelector((state)=>{
  return state.productList;

})
// note- productList name here becz that what we use in combinereducer


const {loading, error, products}= productList 
  
  // const [products, setProducts]= useState([])

 useEffect(()=>{
dispatch(listProducts())

 },[dispatch])



  return (
    <>
<h1> Latest Top Products </h1>

{loading ? <Loader/> : error ?  <Message variant="danger"> {error}</Message>   : <Row>
{products.map((product)=>(
    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>    

    <Product product={product} />
    </Col>
))}

</Row> } 


    </>
  )
}

export default HomeScreen