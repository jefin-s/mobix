import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch Cart
  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/Cart/GetCartItems");

      setCart(res.data.data);

    } catch (error) {
      console.log("Cart fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  const token = sessionStorage.getItem("token");

  if (token) {
    fetchCart();
  }
}, []);


  // 🔥 Add to Cart
  const addToCart = async (productId,quantity=1) => {
    try {

      const res = await axiosInstance.post("/Cart/add",{
           productId: productId,
      quantity: quantity
      });

      toast.success(res.data.message);

      fetchCart();

    } catch (error) {
      toast.error("Please login first");
    }
  };
  const updateCartQuantity = async (productId, quantity) => {
  try {

    await axiosInstance.put("Cart/Update", {
      productId: productId,
      quantity: quantity
    });

    fetchCart();

  } catch (error) {
    console.log(error);
    toast.error("Failed to update cart");
  }
};


  // 🔥 Remove from Cart
  const removeFromCart = async (productId) => {
    try {

      await axiosInstance.delete(`/Cart/${productId}`);

      toast.success("Removed from cart");

      fetchCart();

    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async () => {
  try {

    const res = await axiosInstance.delete("Cart/clear-cart");

    toast.success(res.data.message);

    setCart([]); // instantly clear UI

  } catch (error) {
    console.log(error);
    toast.error("Failed to clear cart");
  }
};


  // 🔥 Check if item exists
  const isIncart = (productId) => {
    return cart?.some(item => item.productId === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        isIncart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
