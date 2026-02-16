import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { base_url } from "../api/api";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 GET ALL PRODUCTS
  const fetchproducts = async () => {
    try {
      const response = await axios.get(
        `${base_url}/Products/GetAllItems`
      );

      setProducts(response.data.data);
      setLoading(false);

    } catch (error) {
      console.log("Product fetch error:", error);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  // 🔹 ADD PRODUCT (Admin)
  const addProducts = async (newproduct) => {
    try {

      const formData = new FormData();

      Object.keys(newproduct).forEach(key => {
        formData.append(key, newproduct[key]);
      });

      await axios.post(
        `${base_url}/Products/Addproduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      fetchproducts();

    } catch (error) {
      console.log("Add product error:", error);
    }
  };

  // 🔹 DELETE PRODUCT (Soft Delete)
  const deleteProductWithId = async (id) => {
    try {
      await axios.patch(
        `${base_url}/Products/Delete/${id}`
      );
      fetchproducts();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // 🔹 UPDATE PRODUCT
  const updateProduct = async (id, updatedData) => {
    try {

      const formData = new FormData();
      Object.keys(updatedData).forEach(key => {
        formData.append(key, updatedData[key]);
      });

      await axios.put(
        `${base_url}/Products/Update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      fetchproducts();

    } catch (error) {
      console.log("Update error:", error);
    }
  };

  // 🔹 SEARCH PRODUCTS
  const searchProducts = async (searchTerm) => {
    try {
      const res = await axios.get(
        `${base_url}/Products/search?searchTerm=${searchTerm}`
      );
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 GET BY CATEGORY
  const getByCategory = async (category) => {
    try {
      const res = await axios.get(
        `${base_url}/Products/Category?category=${category}`
      );
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 PAGINATED PRODUCTS
  const getPaginatedProducts = async (pageNumber = 1, pageSize = 10) => {
    try {
      const res = await axios.get(
        `${base_url}/Products/Paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      setProducts(res.data.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 COMBINED FILTER PRODUCTS
  const getCombinedProducts = async (
    pageNumber = 1,
    pageSize = 10,
    category = "",
    search = "",
    sortBy = ""
  ) => {
    try {
      const res = await axios.get(
        `${base_url}/Products/GetproductsCombined?pageNumber=${pageNumber}&pageSize=${pageSize}&category=${category}&search=${search}&sortBy=${sortBy}`
      );

      setProducts(res.data.data.items);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchproducts,
        addProducts,
        deleteProductWithId,
        updateProduct,
        searchProducts,
        getByCategory,
        getPaginatedProducts,
        getCombinedProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
