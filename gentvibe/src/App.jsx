import React from "react";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Nonauth/Home";
import { Route, Routes } from "react-router-dom";
import Productcard from "./components.jsx/common/Productcard";
import Products from "./pages/Nonauth/Products";
import PublicLayout from "./components.jsx/Layouts/PublicLayout";
import Cart from "./pages/Nonauth/Cart";
import PrivateLayout from "./components.jsx/Layouts/PrivateLayout";
import ProductDetails from "./pages/Nonauth/ProductDetails";
import About from "./pages/Nonauth/About";
import Whishlist from "./pages/Nonauth/Whishlist";
import Checkout from "./pages/Nonauth/Checkout";

import { Toaster } from "react-hot-toast";
import Orders from "./pages/Nonauth/Orders";
import AdminLayout from "./components.jsx/Layouts/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import ManageUser from "./Admin/ManageUser";
import Manageorders from "./Admin/Manageorders";
import ManageProduct from "./Admin/ManageProduct";
import AddForm from "./Admin/AddForm";
import DetailedUser from "./Admin/DetailedUser";

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
          <Route path="/about" element={<About />} />
         
        </Route>
        <Route element={<PrivateLayout />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wish" element={<Whishlist />} />
          <Route path="/checkout" element={<Checkout />} />
           <Route path="/order" element={<Orders/>}/> 
          
        </Route>

        <Route element={<AdminLayout/>}>
          <Route path="/admin" element={<Dashboard/>}/>
          <Route path="/userlist" element={<ManageUser/>}/>
          <Route path="/userorder" element={<Manageorders/>}/>
          <Route path="/allproducts" element={<ManageProduct/>}/>
          <Route path="/addform" element={<AddForm/>}/>
          <Route path="/detailuser/:userid" element={<DetailedUser/>}/>

        </Route>
      </Routes>
     <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
