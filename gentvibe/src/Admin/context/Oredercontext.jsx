// import { createContext, useEffect, useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import toast from "react-hot-toast";

// export const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {

//   const [orders, setOrders] = useState([]);

//   // 🔹 FETCH ALL ORDERS
//   const fetchOrders = async (fromDate, toDate, status) => {

//     try {

//       const response = await axiosInstance.get(
//         `/Order/Admin/GetAllOrder`,
//         {
//           params: {

//             fromDate: fromDate || null,
//             toDate: toDate || null,
//             status: status || null

//           }
//         }
//       );

//       setOrders(response.data.data);

//     }

//     catch (error) {

//       console.error(error);

//     }

//   };



//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // 🔹 TOTAL REVENUE
//   const totalrevenue = orders.reduce(
//     (acc, item) => acc + item.totalAmount,
//     0
//   );

//   // 🔹 UPDATE ORDER STATUS
// const updateOrderstatus = async (id, newStatus) => {
//   try {
//     await axiosInstance.patch(
//       `/Order/Admin/Orderstatus`,
//       {
//         orderId: id,
//         newStatus: newStatus
//       }
//     );
//     toast.success("Order Updated SuccessFully")

//     setOrders(prev =>
//       prev.map(order =>
//         order.id === id
//           ? { ...order, status: newStatus }
//           : order
//       )
//     );

//   }
//    catch (error) {
//     console.log(error);
//     toast.error(error.response.data.message)
//   }
// };


//   return (
//     <OrderContext.Provider
//       value={{ orders, totalrevenue, updateOrderstatus }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };

import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

  const [orders, setOrders] = useState([]);

  // ✅ FETCH ORDERS WITH FILTER + PAGINATION

  const fetchOrders = async (
    FromDate,
    ToDate,
    Status,
    PageNumber = 1,
    PageSize = 10
  ) => {

    try {

      const response = await axiosInstance.get(

        `/Order/Admin/GetAllOrder`,

        {

          params: {

            FromDate: FromDate || null,
            ToDate: ToDate || null,
            Status: Status || null,
            PageNumber: PageNumber,
            PageSize: PageSize

          }

        }

      );

      setOrders(response.data.data);

    }

    catch (error) {

      console.error(error);

    }

  };



  // default load

  useEffect(() => {

    fetchOrders(null, null, null, 1, 10);

  }, []);



  // TOTAL REVENUE

  const totalrevenue = orders.reduce(

    (acc, item) => acc + item.totalAmount,

    0

  );



  // UPDATE ORDER STATUS

  const updateOrderstatus = async (id, newStatus) => {

    try {

      await axiosInstance.patch(

        `/Order/Admin/Orderstatus`,

        {

          orderId: id,

          newStatus: newStatus

        }

      );

      toast.success("Order Updated Successfully");



      setOrders(prev =>

        prev.map(order =>

          order.id === id

            ? { ...order, status: newStatus }

            : order

        )

      );

    }

    catch (error) {

      toast.error(error.response.data.message);

    }

  };



  return (

    <OrderContext.Provider

      value={{

        orders,

        totalrevenue,

        updateOrderstatus,

        fetchOrders

      }}

    >

      {children}

    </OrderContext.Provider>

  );

};