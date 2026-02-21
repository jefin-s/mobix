import { createContext, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";

export const OrderContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [myOrders, setMyOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);



  const fetchOrderDetails = async (orderId) => {

  try {

    const res = await axiosInstance.get(
      `/Order/details/${orderId}`
    );

    setOrderDetails(res.data.data);

  }
  catch (error) {

    toast.error("Failed to fetch order details");

  }

};
  const placeCartOrder = async (addressId, paymentMethod) => {
    try {
      const res = await axiosInstance.post(
        "/Order/CreateOrder",

        {
          addressId: addressId,
          paymentMethod: paymentMethod,
        },
      );

      toast.success(res.data.message);

      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  //  BUY NOW ORDER

  const buyNowOrder = async (productId, qty, addressId, paymentMethod) => {
    try {
      const res = await axiosInstance.post(
        `/Order/BuyNow/${productId}`,

        {
          productId,
          qty,
          addressId,
          paymentMethod,
        },
      );

      toast.success(res.data.message);

      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message);

      return null;
    }
  };

  // 🟢 FETCH MY ORDERS

  const fetchMyOrders = async () => {
    try {
      const res = await axiosInstance.get("/Order/Myorders");

      setMyOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🟢 CANCEL ORDER

  const cancelOrder = async (orderId) => {
    try {
      const res = await axiosInstance.put(`/Order/CancelOrder/${orderId}`);
      
      toast.success(res.data.message);

      fetchMyOrders();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        placeCartOrder,

        buyNowOrder,

        fetchMyOrders,

        cancelOrder,

        myOrders,
        fetchOrderDetails,
        orderDetails
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
