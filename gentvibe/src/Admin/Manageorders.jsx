import React, { useContext, useState } from "react";
import { OrderContext } from "./context/Oredercontext";

const Manageorders = () => {

  const { orders, updateOrderstatus, fetchOrders } = useContext(OrderContext);


  // FILTER STATES

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [status, setStatus] = useState("");



  // PAGINATION

  const [pageNumber, setPageNumber] = useState(1);

  const pageSize = 10;



  // FILTER BUTTON

  const handleFilter = () => {

    setPageNumber(1);

    fetchOrders(fromDate, toDate, status, 1, pageSize);

  };



  // NEXT PAGE

  const handleNext = () => {

    const next = pageNumber + 1;

    setPageNumber(next);

    fetchOrders(fromDate, toDate, status, next, pageSize);

  };



  // PREVIOUS PAGE

  const handlePrevious = () => {

    if (pageNumber === 1) return;

    const prev = pageNumber - 1;

    setPageNumber(prev);

    fetchOrders(fromDate, toDate, status, prev, pageSize);

  };



  return (

    <div className="min-h-screen bg-gray-100 p-6">


      <h1 className="text-3xl font-bold mb-6">

        Manage Orders

      </h1>



      {/* FILTER UI */}

      <div className="bg-white p-4 rounded shadow mb-5 flex gap-4">


        <input
          type="date"
          value={fromDate}
          onChange={(e)=>setFromDate(e.target.value)}
          className="border p-2 rounded"
        />


        <input
          type="date"
          value={toDate}
          onChange={(e)=>setToDate(e.target.value)}
          className="border p-2 rounded"
        />


        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          className="border p-2 rounded"
        >

          <option value="">All</option>

          <option value={0}>Pending</option>

          <option value={1}>Confirmed</option>

          <option value={2}>Packed</option>

          <option value={3}>Shipped</option>

          <option value={4}>Delivered</option>

          <option value={5}>Cancelled</option>

        </select>



        <button
          onClick={handleFilter}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >

          Filter

        </button>


      </div>



      {/* TABLE */}


      <div className="bg-white shadow rounded text-black">


        <table className="min-w-full">


          <thead className="bg-indigo-600 text-white">


            <tr>

              <th className="p-3">Order ID</th>

              <th className="p-3">Customer</th>

              <th className="p-3">Image</th>

              <th className="p-3">Total</th>

              <th className="p-3">Status</th>

            </tr>


          </thead>



          <tbody>


            {orders.map(order => (


              <tr key={order.id} className="border-b">


                <td className="p-3">{order.id}</td>


                <td className="p-3">

                  {order.shippingFullName}

                </td>



                <td className="p-3">


                  {order.items?.map(item => (


                    <img

                      key={item.productId}

                      src={item.thumbnail}

                      className="w-14 inline mr-2"

                    />


                  ))}


                </td>



                <td className="p-3">

                  ₹{order.totalAmount}

                </td>



                <td className="p-3">


                  <select

                    value={order.orderStatus}

                    onChange={(e)=>

                      updateOrderstatus(

                        order.id,

                        Number(e.target.value)

                      )

                    }

                  >

                    <option value={0}>Pending</option>

                    <option value={1}>Confirmed</option>

                    <option value={2}>Packed</option>

                    <option value={3}>Shipped</option>

                    <option value={4}>Delivered</option>

                    <option value={5}>Cancelled</option>

                  </select>


                </td>


              </tr>


            ))}


          </tbody>


        </table>


      </div>



      {/* PAGINATION */}


      <div className="mt-5 flex gap-3">


        <button

          onClick={handlePrevious}

          className="bg-gray-500 text-white px-4 py-2"

        >

          Previous

        </button>



        <button

          onClick={handleNext}

          className="bg-indigo-600 text-white px-4 py-2"

        >

          Next

        </button>


      </div>


    </div>

  );

};

export default Manageorders;