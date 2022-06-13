import React from "react";
import {useEffect} from "react"
import {Link} from "react-router-dom"

import {useDispatch, useSelector} from "react-redux";
// import {Row, Col, ListGroup, Image, Form, Button, Cart} from "react-bootstrap"
// import Message from "../Components/Message.jsx"

import {addToCart} from "../actions/cartActions.js"
import {useParams, useSearchParams} from "react-router-dom"

const CartScreen= (()=>{

    const {id} = useParams()

    const [searchParams, setSearchPrams]= useSearchParams()

    const Qty= searchParams.get("qty")

    const dispatch = useDispatch()

const cart = useSelector((state) => state.cart)

const {cartItems} = cart 

console.log(cartItems)


    useEffect(()=>{

if(id){
    dispatch(addToCart(id, Qty))
}


    },[dispatch, id, Qty])

return <div> Cart</div>
})


export default CartScreen