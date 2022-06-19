import jwt from "jsonwebtoken"
import expressAsyncHandler from "express-async-handler";

import User from "../models/userModel.js"


const protect = expressAsyncHandler( async (req, res, next) =>{


    let token 


    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

try{

    token = req.headers.authorization.split(" ")[1]

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    console.log(decoded)

    req.user= await User.findById(decoded.id).select("-password")

    console.log(req.user)


    next()
}
catch(error){
console.log(error)
res.status(401)
throw new Error ("Token failed, bad token ")


}

    }

    if(!token){

        res.status(401)

        throw new Error ("Not authorized, no Token ")
    }

    

}
)
export {protect}