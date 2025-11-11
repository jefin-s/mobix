import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { base_url } from "../../api/api";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${base_url}/users`);
        const users = response.data;

       
        const allOrders = users.flatMap(user => user.orders || []);

        setOrders(allOrders);
        console.log("All orders:", allOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []); 

  return (
    <OrderContext.Provider value={{ orders }}>
      {children}
    </OrderContext.Provider>
  );
};
