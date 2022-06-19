import React from "react";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen.jsx";
import { Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx"
import PaymentScreen from "./screens/PaymentScreen.jsx"
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx"


function App() {
  return (
    <>
      <Header />

      <main className='py-3'>
        <Container>
          {" "}
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />{" "}
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />



            {"? MAKES id OPTIONAL    in cart/id"}
          </Routes>
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default App;

// rm rf .git
// put. gitignore in the root directory
// "Node modules/" will prevent server(backend) node modules also to be pushed in backend   ====Added in the .gitignore file
//.env also added in .gitignore
