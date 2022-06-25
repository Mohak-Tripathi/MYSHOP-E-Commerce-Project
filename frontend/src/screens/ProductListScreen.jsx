import React from "react";

import { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../Components/Message.jsx";
import Loader from "../Components/Loader";
import { useNavigate} from "react-router-dom";
import { listProducts, deleteProduct } from "../actions/productActions";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  


  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success:successDelete } = productDelete;


  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;



  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // disabled={userInfo._id === user._id}  // if you don't want Admin should delete itself

    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (Id) => {
    if (window.confirm("Are you sure")) {
        dispatch(deleteProduct(Id));
    }
  };

  const createProductHandler = () => {
    console.log("hello");
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1> Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Products
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th> ID </th>
              <th> Name </th>
              <th> Price</th>
              <th> Category</th>
              <th> Brands</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn sm'>
                      <i className='fa fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    {" "}
                    <i className='fas fa-trash'></i>{" "}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
