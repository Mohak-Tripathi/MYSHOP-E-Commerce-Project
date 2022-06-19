
import expressAsyncHandler from "express-async-handler";

import Product from "../models/productModel.js"



//@desc Fetch all Products
//@route GET/api/products
//@access PUBLIC - anybody can access it

const getProducts = expressAsyncHandler(async(req, res) => {
    const products = await Product.find({}).lean().exec()
    // throw new Error ("problem")
        return res.json(products)
})




 //@desc Fetch single Products
//@route GET/api/products/:id
//@access PUBLIC - anybody can access it

const getProductById = expressAsyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id).lean().exec()
   
   if(product){
    return  res.json(product)
   }
   else{
       res.status(404)
       throw new Error("Product not Found")
    //    return res.status(404).json({message: "Product not found"})
   }
})

export {
    getProducts,
    getProductById
}







// import expressAsyncHandler from "express-async-handler";
// import generateToken from "../utils/generateToken.js";
// import User from "../models/userModel.js"; 



// //@desc Auth user & get Token 
// //@route POST/api/users/login
// //@access PUBLIC - anybody can access it

// // const authUser = expressAsyncHandler(async(req, res) => {
// //   const users = await User.find({}).lean().exec()
// //   // throw new Error ("problem")
// //       return res.json({users})
// // })



// const authUser = expressAsyncHandler(async(req, res) => {
//   const {email,password} = req.body

//   // return res.send({email,password})

// const user = await User.findOne({email: email})
// console.log(user)

// if(user &&  (await user.matchPassword(password))){

// res.json({          
//   _id: user._id,
//   name: user.name,
// email: user.email,
// isAdmin: user.isAdmin,
// token: generateToken(user._id)
//   })


// }
// else{
//   res.status(401)
//   throw new Error ("invalid email or password")
// }
// })

// // export {authUser}
// export default authUser

