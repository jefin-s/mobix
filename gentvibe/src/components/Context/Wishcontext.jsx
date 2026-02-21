import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";

export const Wishcontext = createContext();

export const WishProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);


  // ✅ Fetch Wishlist
  const fetchWishlist = async () => {

    try {

      setLoading(true);

      const res = await axiosInstance.get("/WishList");

      setWishlist(res.data.data);

    }
    catch (error) {

      console.log("Wishlist fetch error", error);

    }
    finally {

      setLoading(false);

    }

  };


  // ✅ Load on start
  useEffect(() => {

    const token = sessionStorage.getItem("token");

    if (token)
      fetchWishlist();

  }, []);




  // ✅ Toggle Wishlist
  const toggleWishlist = async (productId) => {

    try {

      const res = await axiosInstance.post(`/WishList/${productId}`);

      toast.success(res.data.message);

      fetchWishlist();

    }
    catch (error) {

      toast.error(error.response?.data?.message);

    }

  };



  // ✅ Check exists
  const alreadyInWishlist = (productId) => {

    return wishlist.some(item => item.productId === productId);

  };



  return (

    <Wishcontext.Provider
      value={{
        wishlist,
        loading,
        toggleWishlist,
        alreadyInWishlist
      }}
    >

      {children}

    </Wishcontext.Provider>

  );

};
