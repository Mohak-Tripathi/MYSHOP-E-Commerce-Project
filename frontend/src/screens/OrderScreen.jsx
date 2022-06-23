import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import { useState, useEffect } from "react";

import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link , useNavigate} from "react-router-dom";
import Loader from "../Components/Loader.jsx";
import Message from "../Components/Message.jsx";
import { getOrderDetails,payOrder} from "../actions/orderActions";
import {ORDER_PAY_RESET} from "../constants/orderConstant"


const OrderScreen = () => {
  const dispatch = useDispatch();
  // const navigate= useNavigate()

  const [sdkReady, setSdkReady] = useState(false);

  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);

  const { order, loading, error } = orderDetails; // here orderDetails not getorderDetails (which is an action)

  const orderPay = useSelector((state) => state.orderPay);

  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    //order.itemPrice should come from mongoose
  }

  useEffect(() => {

// if(!userInfo){
//   navigate("/login")
// }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        `http://localhost:5000/api/config/paypal`
      );

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);

      // "https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&locale=en_US"></script
    };

    if (!order || order._id !== id || successPay) {
      dispatch({type:ORDER_PAY_RESET})
      dispatch(getOrderDetails(id)); // with successPay==true - it will redispatch
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, order, successPay]);


const successPaymentHandler = (paymentResult) =>{
  console.log(paymentResult)
  dispatch(payOrder(id, paymentResult))
}


  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'> {error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2> Shipping</h2>

              <p>
                {" "}
                <strong> Name:</strong> {order.user.name}{" "}
              </p>
              <p>
                {" "}
                <strong> Email:</strong> {order.user.email}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>

              <p>
                <strong> Address: </strong>
                {order.shippingAddress.address} {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode}{" "}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant='success'>
                  Delievered on {order.deliveredAt} {/*created at hona chahiye*/}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>

              <p>
                <strong> Mathod: </strong>

                {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2> Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>

                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {" "}
                              {item.name}
                            </Link>
                          </Col>

                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2> Order Summary </h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col> Items</Col>
                  <Col> ${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col> Shipping Price</Col>
                  <Col>  ${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col> Tax Price </Col>
                  <Col>  ${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col> Total </Col>
                  <Col> ${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton amount={order.totalPrice}
                      onSuccess={ successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
