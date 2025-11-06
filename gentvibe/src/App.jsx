import React from "react";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Productcard from "./components.jsx/common/Productcard";
import Products from "./pages/Nonauth/Products";
import PublicLayout from "./components.jsx/Layouts/PublicLayout";
import Cart from "./pages/Nonauth/Cart";
import PrivateLayout from "./components.jsx/Layouts/PrivateLayout";
import ProductDetails from "./pages/Nonauth/ProductDetails";
import About from "./pages/Nonauth/About";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/prodcrd" element={<Productcard />} />
          <Route path="prdctpage" element={<Products />} />
          <Route path="prdctdet/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About/>}/>
        </Route>
        <Route element={<PrivateLayout/>}> 
      
        {/* <Route path='/login' element={<Login/>}/> */}
        <Route path='/cart' element={<Cart/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
