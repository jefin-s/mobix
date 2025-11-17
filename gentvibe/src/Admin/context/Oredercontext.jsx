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

  
    
      const totalrevenue=orders.reduce((acc,item)=>acc+item.totalAmount,0)
      console.log(totalrevenue);
      
       const updateOrderstatus = async (id, newStatus) => {
  try {


    const {data:users}=await axios.get(`${base_url}/users`)
    const user=users.find((u)=>u.orders?.some((order)=>order.orderId==id))

    if(!user) return 

     const updatedOrders = user.orders.map(order =>
      order.orderId === id
        ? { ...order, status: newStatus }
        : order
    );
    await axios.put(`${base_url}/users/${user.id}`, { ...user,orders:updatedOrders});

    // Update frontend state
    setOrders(prev =>
      prev.map(item =>
        item.orderId === id ? { ...item, status: newStatus } : item
      )
    );
  } catch (error) {
    console.log(error);
  }
};
      


  return (
    <OrderContext.Provider value={{ orders,totalrevenue,updateOrderstatus }}>
      {children}
    </OrderContext.Provider>
  );
};
