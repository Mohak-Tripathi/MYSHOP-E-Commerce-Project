
import axios from "axios"

import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS} from "../constants/productConstant.js"


export const listProducts = ()=>{

    return async function(dispatch){

try{

    dispatch({type: PRODUCT_LIST_REQUEST})

    const {data} = await axios.get("http://localhost:5000/api/products")

    dispatch({type: PRODUCT_LIST_SUCCESS, payload: data })
}
catch(error){

    dispatch({type: PRODUCT_LIST_FAIL,
    payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    // payload: error.response,
    })
}

    }
}





export const listProductDetails = (id)=>{

    return async function(dispatch){

try{

    dispatch({type: PRODUCT_DETAILS_REQUEST})

    const {data} = await axios.get(`http://localhost:5000/api/products/${id}`)

    dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data })
}
catch(error){

    dispatch({type: PRODUCT_DETAILS_FAIL,
    payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
}

    }
}

