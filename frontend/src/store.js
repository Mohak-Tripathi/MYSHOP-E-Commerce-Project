import {legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from "@redux-devtools/extension";


import { productListReducer , productDetailsReducer} from './reducers/productReducers.js';
import {cartReducer} from "./reducers/cartReducer.js"
import {userLoginReducer,userRegisterReducer, userDetailsReducer,userUpdateProfileReducer} from "./reducers/userReducers.js"

import thunk from "redux-thunk";
// import {composeWithDevTools} from "redux-devtools-extention";

const rootreducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer ,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer
    


});

const cartItemsFromStorage= localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : []


const userInfoFromStorage= localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const shippingAddressFromStorage= localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}



const initialState= {
  cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
  userLogin: {userInfo: userInfoFromStorage},
  

}




const store= createStore(rootreducer, initialState, composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
)

export default store