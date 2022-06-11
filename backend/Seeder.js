import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/user.js"
import product from "./data/product.js";

import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"


import connectDB from "./config/db.js"

dotenv.config();

connectDB()

