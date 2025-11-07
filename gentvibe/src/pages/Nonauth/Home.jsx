import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import ProductSlider from "../../components.jsx/slider/Productslider";
import Products from "./Products";
import Navbar from "../../components.jsx/common/Navbar";

const Home = () => {
  //  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      {/* <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> */}
      <section>
        <ProductSlider />
        <Products/>
      </section>
    </div>
  );
};

export default Home;
