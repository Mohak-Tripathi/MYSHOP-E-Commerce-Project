import { CART_ADD_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstant.js";

import axios from "axios";

export const addToCart = (id, qty) => {
  return async function (dispatch, getState) {
    const  {data}  = await axios.get(
      `http://localhost:5000/api/products/${id}`
    );

    // console.log(data, "ji")
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
    console.log("joooooooooo")
  };
};







export const saveShippingAdress = (data) => (dispatch) =>{

dispatch ({
  type: CART_SAVE_SHIPPING_ADDRESS,
  payload: data
})

localStorage.setItem("shippingAddress", JSON.stringify(data))


}


export const savePaymentMethod = (data) => (dispatch) =>{

  dispatch ({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  })
  
  localStorage.setItem("paymentMethod", JSON.stringify(data))
  
  
  }
  



