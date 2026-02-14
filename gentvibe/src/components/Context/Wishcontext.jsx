import { createContext, useEffect, useState } from "react";
import { base_url } from "../../api/api";
import axios from "axios";
import toast from "react-hot-toast";

export const Wishcontext = createContext();

export const WishProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ SAFE localStorage Load
  useEffect(() => {

    try {

      const storedUser = localStorage.getItem("currentUser");

      if (storedUser && storedUser !== "undefined") {

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        fetchWishlistOfUser(parsedUser.id);

      }

    } catch (error) {

      console.log("Wishlist localStorage error:", error);
      localStorage.removeItem("currentUser");

    }

  }, []);

  // ✅ Fetch Wishlist
  const fetchWishlistOfUser = async (userId) => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${base_url}/users/${userId}`,
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          : {}
      );

      setWishlist(response.data.whishlist || []);

    } catch (error) {

      console.log("Fetch wishlist error:", error);

    }

  };

  // ✅ Toggle Wishlist
  const toggleWishlist = async (product) => {

    if (!user) {
      toast.error("Please login first");
      return;
    }

    const existing = wishlist.find(item => item.id === product.id);

    let updatedWishlist;

    if (existing) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
      toast.success("Removed from wishlist");
    }
    else {
      updatedWishlist = [...wishlist, product];
      toast.success("Added to wishlist");
    }

    setWishlist(updatedWishlist);

    try {

      const token = localStorage.getItem("token");

      await axios.patch(
        `${base_url}/users/${user.id}`,
        { whishlist: updatedWishlist },
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          : {}
      );

    } catch (error) {

      console.log("Wishlist update error:", error);

    }

  };

  // ✅ Check if product already exists
  const alreadyInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <Wishcontext.Provider
      value={{
        wishlist,
        toggleWishlist,
        alreadyInWishlist
      }}
    >
      {children}
    </Wishcontext.Provider>
  );

};
