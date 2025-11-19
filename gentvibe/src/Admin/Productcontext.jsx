import axios from "axios";
import { createContext, useEffect, useState } from "react";

import { base_url } from "../api/api";

export const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  
  const[loading,setloading]=useState(true)
  const fetchproducts = async () => {
      try {
        const response = await axios(`${base_url}/products`);
        const Allproducts = response.data;

        console.log(Allproducts);
        setProducts(Allproducts);
        setloading(false)
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    
    fetchproducts();
  }, []);

  const addProducts = async (newproduct) => {
    try {
      const res = await axios.post(`${base_url}/products/`, newproduct);
      // setProducts([...products, res.data]);
      fetchproducts()
    } catch (error) {

      console.log(error);
    }
  };

  const delteProductWithid = async (id) => {
    try {
      await axios.patch(`${base_url}/products/${id}`, { isDeleted: true });
      // setProducts(products.filter((item) => item.id != id));
      fetchproducts()
    } catch (error) {
      console.log(error);
    }
  };
 


  return (
    <ProductContext.Provider
      value={{ products, addProducts, delteProductWithid,loading,setloading}}
    >
      {children}
    </ProductContext.Provider>
  );
};
