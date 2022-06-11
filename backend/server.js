// const express= require('express');
import express from 'express'

import connectDB from "./config/db.js"

connectDB()
// const dotenv= require("dotenv")
import dotenv from "dotenv"
// const products= require('./data/products');

import products from './data/products.js' 
//Note- If using ES Module then add ".js" in backend file only/ 

dotenv.config()


const app = express();

app.get("/", (req, res) => {
   return  res.send("API is running")
})


app.get("/api/products", (req, res) => {
    return  res.json(products)
 })

 app.get("/api/products/:id", (req, res) => {
   
   const product = products.find(product => product._id === req.params.id)
    return  res.send(product)
 })

const PORT= process.env.PORT || 5000


app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} MODE at port ${PORT}`))