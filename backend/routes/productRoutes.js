import express from "express";

import expressAsyncHandler from "express-async-handler";
const router = express.Router();
import Product from "../models/productModel.js"



//@desc Fetch all Products
//@route GET/api/products
//@access PUBLIC - anybody can access it

router.get("/",    expressAsyncHandler(async(req, res) => {
    const products = await Product.find({}).lean().exec()
// throw new Error ("problem")
    return res.json(products)
 }))




 //@desc Fetch single Products
//@route GET/api/products/:id
//@access PUBLIC - anybody can access it

router.get("/:id", expressAsyncHandler(async(req, res) => {
   
   const product = await Product.findById(req.params.id).lean().exec()
   
   if(product){
    return  res.json(product)
   }
   else{
       res.status(404)
       throw new Error("Product not Found")
    //    return res.status(404).json({message: "Product not found"})
   }
   
 }))

 export default router;


