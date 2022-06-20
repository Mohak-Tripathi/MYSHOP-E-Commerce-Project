import mongoose from "mongoose";

const connectDB = async() =>{
   try{
    const conn= await mongoose.connect(
        "mongodb+srv://Mohak_Tripathi:mohak1234@ecommerceprotipshop.kouma.mongodb.net/ProEcommerce?retryWrites=true&w=majority"
    )
    console.log(`mongo connected: ${conn.connection.host} `)
   }
   catch(error){
    
       console.log(`Error: ${error.message}`)
     
   }
    
}

export default connectDB

