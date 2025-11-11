import axios from "axios";
import { createContext, useEffect, useState } from "react";

import { base_url } from "../api/api";

export const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await axios(`${base_url}/products`);
        const Allproducts = response.data;

        console.log(Allproducts);
        setProducts(Allproducts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchproducts();
  }, []);

  const addProducts = async (newproduct) => {
    try {
      const res = await axios.post(`${base_url}/products/`, newproduct);
      setProducts([...products, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const delteProductWithid = async(id) => {
    try {
        await axios.delete(`${base_url}/products/${id}`)
        setProducts(products.filter((item)=>item.id!=id))
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProductContext.Provider
      value={{ products, addProducts, delteProductWithid }}
    >
      {children}
    </ProductContext.Provider>
  );
};
