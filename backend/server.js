// const express= require('express');
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB();
// const dotenv= require("dotenv")
import dotenv from "dotenv";
// const products= require('./data/products');

//Note- If using ES Module then add ".js" in backend file only/


// const cors = require('cors');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  return res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req,res)=> res.send(process.env.PAYPAL_CLIENT_ID) )//Paypal

app.use(notFound);

app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} MODE at port ${PORT}`
  )
);
