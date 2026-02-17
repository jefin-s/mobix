import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

  const [orders, setOrders] = useState([]);

  // 🔹 FETCH ALL ORDERS
  const fetchOrders = async () => {
    try {

      const response = await axiosInstance.get(
        `Order/Admin/GetAllOrder`
      );

      setOrders(response.data.data);

    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 TOTAL REVENUE
  const totalrevenue = orders.reduce(
    (acc, item) => acc + item.totalAmount,
    0
  );

  // 🔹 UPDATE ORDER STATUS
const updateOrderstatus = async (id, newStatus) => {
  try {
    await axiosInstance.patch(
      `/Order/Admin/Orderstatus`,
      {
        orderId: id,
        newStatus: newStatus
      }
    );
    toast.success("Order Updated SuccessFully")

    setOrders(prev =>
      prev.map(order =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );

  }
   catch (error) {
    console.log(error);
    toast.error(error.response.data.message)
  }
};


  return (
    <OrderContext.Provider
      value={{ orders, totalrevenue, updateOrderstatus }}
    >
      {children}
    </OrderContext.Provider>
  );
};
