import React from "react";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Productcard from "./components.jsx/common/Productcard";
import Products from "./pages/Nonauth/Products";
import PublicLayout from "./components.jsx/Layouts/PublicLayout";
import Cart from "./pages/Nonauth/Cart";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/prodcrd" element={<Productcard />} />
          <Route path="prdctpage" element={<Products />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path='/login' element={<Login/>}/> */}
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </div>
  );
};

export default App;
