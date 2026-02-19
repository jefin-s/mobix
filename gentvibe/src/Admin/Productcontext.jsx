import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
const [pageSize] = useState(10);


  // ✅ FETCH PRODUCTS
  // const fetchproducts = async () => {

  //   try {

  //     setLoading(true);

  //     const response = await axiosInstance.get(
  //       "/Products/GetAllItems"
  //     );

  //     setProducts(response.data.data);

  //   } catch (error) {

  //     console.log(error);

  //     toast.error("Failed to fetch products");

  //   } finally {

  //     setLoading(false);

  //   }
  // };
  const fetchproducts = async (
  pageNumber = 1,
  pageSize = 10,
  category = null,
  search = null,
  sortBy = null
) => {

  try {

    setLoading(true);

    const response = await axiosInstance.get(
      "/Products/GetproductsCombined",
      {
        params: {

          pageNumber,

          pageSize,

          category,

          search,

          sortBy

        }
      }
    );

    setProducts(response.data.data.items);
setTotalRecords(response.data.data.totalRecords)
  }

  catch (error) {

    console.log(error);

    toast.error("Failed to fetch products");

  }

  finally {

    setLoading(false);

  }

};


  // useEffect(() => {

  //   fetchproducts();

  // }, []);

  // ✅ ADD PRODUCT
const addProducts = async (formData) => {

  try {

    const res = await axiosInstance.post(
      "/Products/Addproduct",
      formData
    );

    toast.success("Product added successfully");

    // fetchproducts();

    return { success: true };

  } catch (error) {

    if (error.response?.data?.errors) {

      return {
        success: false,
        errors: error.response.data.errors
      };

    }

    toast.error("Failed to add product");

    return { success: false };

  }

};


  // ✅ DELETE PRODUCT
  const deleteProductWithId = async (id) => {

    try {

      await axiosInstance.patch(
        `/Products/Delete/${id}`
      );

      toast.success("Product deleted");

      return true

    } catch (error) {

      console.log(error);

      toast.error("Delete failed");
      return false;

    }
  };

  // ✅ UPDATE PRODUCT
  const updateProduct = async (id, updatedData) => {

    try {

      const formData = new FormData();

      Object.keys(updatedData).forEach(key => {

        formData.append(key, updatedData[key]);

      });

      await axiosInstance.put(
        `/Products/Update/${id}`,
        formData
      );

      toast.success("Product updated");

      // fetchproducts();

      return true;

    } catch (error) {

      console.log(error);

      toast.error(error.response?.data?.message);

      return false;
    }
  };

  return (

    <ProductContext.Provider value={{

      products,
      loading,
      fetchproducts,
      addProducts,
      deleteProductWithId,
      updateProduct,
      totalRecords,
      pageSize

    }}>

      {children}

    </ProductContext.Provider>

  );
};
