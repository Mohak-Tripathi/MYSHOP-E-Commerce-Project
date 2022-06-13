import React from "react";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header";
import {Container} from 'react-bootstrap';
import HomeScreen from "./screens/HomeScreen.jsx"
import {Routes, Route} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx"

function App() {
  return (
    <>
      <Header />
     
        <main className="py-3">
        <Container>
          {" "}
          <Routes>
<Route path="/" element= {<HomeScreen/>} />
<Route path="/product/:id" element= {<ProductScreen/>} />
<Route path="/cart/:id" element= {<CartScreen/>} />     {"? MAKES id OPTIONAL    in cart/id"}


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
