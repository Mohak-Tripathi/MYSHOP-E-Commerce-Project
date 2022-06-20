import expressAsyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";

//@desc Create new Order
//@route POST/api/orders
//@access PUBLIC - anybody can access it

const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;


  if (orderItems && orderItems.length === 0) {
    // if (typeof orderItems === 'undefined' || orderItems.length === 0) 
    res.status(400);
    throw new Error("No order Items");

  } else {
    const order = new Order({

        orderItems,
        user: req.user._id, // protected route - get token
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });
const createdOrder = await order.save();
res.status(201).json(createdOrder);

  }
});

// Note- The difference between the two is that .create() both instantiates a new mongoose schema object and saves it. 

// In this case, Brad decided to do these two steps separately.  He first created a new order, calling it "order".  Afterwards, he put the saved order in createdOrder.

export {addOrderItems}