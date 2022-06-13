import {legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from "@redux-devtools/extension";


import { productListReducer , productDetailsReducer} from './reducers/productReducers.js';
import {cartReducer} from "./reducers/cartReducer.js"

import thunk from "redux-thunk";
// import {composeWithDevTools} from "redux-devtools-extention";

const rootreducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer ,
    cart: cartReducer,

});

const cartItemsFromStorage= localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : []

const initialState= {
  cart: { cartItems: cartItemsFromStorage }
}




const store= createStore(rootreducer, initialState, composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
)

export default store