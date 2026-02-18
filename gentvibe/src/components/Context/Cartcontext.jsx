import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Cart
  const fetchCart = async () => {

    try {

      setLoading(true);

      const res = await axiosInstance.get("/Cart/GetCartItems");

      setCart(res.data.data.items);
      setGrandTotal(res.data.data.grandTotal);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    const token = sessionStorage.getItem("token");

    if (token) fetchCart();

  }, []);



  // ✅ Add to cart
  const addToCart = async (productId, quantity = 1) => {

    try {

      const res = await axiosInstance.post("/Cart/add", {
        productId,
        quantity
      });

      toast.success(res.data.message);

      fetchCart();

    } catch(error) {

      toast.error(error.response.data.message);

    }

  };



  // ✅ Remove item
  const removeCartitem = async (productId) => {

    try {

      await axiosInstance.delete(`/Cart/${productId}`);

      toast.success("Removed");

      fetchCart();

    } catch {

      toast.error("Remove failed");

    }

  };



  // ✅ Increase Quantity
  const incementQuantity = async (productId, quantity) => {

    await axiosInstance.put("/Cart/Update", {
      productId,
      quantity: quantity + 1
    });

    fetchCart();

  };



  // ✅ Decrease Quantity
  const decremnetQuantity = async (productId, quantity) => {

    if (quantity <= 1) return;

    await axiosInstance.put("/Cart/Update", {
      productId,
      quantity: quantity - 1
    });

    fetchCart();

  };



  // ✅ Total Quantity
  const totalQuantity = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );



  // ✅ Check Exists
  const isIncart = (productId) => {

    return cart.some(item => item.productId === productId);

  };

  const clearCart = async () => {

    try {

      const res = await axiosInstance.delete("/Cart/clear-cart");

      toast.success(res.data.message);

      setCart([]);

      setGrandTotal(0);

    } catch {

      toast.error("Clear cart failed");

    }

  };

  return (

    <CartContext.Provider
      value={{

        cart,
        grandTotal,
        totalQuantity,
        loading,

        addToCart,
        removeCartitem,
        incementQuantity,
        decremnetQuantity,

        isIncart,
        clearCart

      }}
    >

      {children}

    </CartContext.Provider>

  );

};
