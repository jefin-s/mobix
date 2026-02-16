import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

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

    setOrders(prev =>
      prev.map(order =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );

  } catch (error) {
    console.log(error);
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
