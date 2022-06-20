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
    res.status(400);
    throw new Error("No order Items");
    return;
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


export {addOrderItems}