import React, { useContext, useState } from "react";
import { OrderContext } from "./context/Oredercontext";

const Manageorders = () => {
  const { orders, updateOrderstatus } = useContext(OrderContext);
  const[searchTerm,setSearchterm]=useState("")
  const searchedOrders=orders.filter((item)=>item.address.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Orders</h1>
      <div className="flex justify-end">
      <div className="mb-5">
   <input 
            type="text"
            className="border rounded-full px-4 py-2  w-full md:w-60"
            onChange={(e) => setSearchterm(e.target.value)}
            placeholder="Search"
          />
          </div>
          </div>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders available.</p>
      ) : (
        <div className="overflow-x-auto bg-white p-6 shadow-xl rounded-2xl border border-gray-300">
          <table className="min-w-full border-collapse rounded-lg overflow-hidden">
            {/* Table Header */}
            <thead className="bg-indigo-600 text-white sticky top-0">
              <tr>
                <th className="border border-gray-300 p-3 text-left font-semibold">
                  Order ID
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold">
                  Shipping Address
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold">
                  Items
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold">
                  Total Amount
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {searchedOrders.map((order, index) => (
                <tr
                  key={order.orderId}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  {/* Order ID */}
                  <td className="border border-gray-300 p-4 font-semibold text-indigo-700">
                    {order.orderId}
                  </td>

                  {/* Shipping Address */}
                  <td className="border border-gray-300 p-4 text-sm leading-6">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {order.address.name}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span>{" "}
                      {order.address.address}
                    </p>
                    <p>
                      <span className="font-medium">City:</span>{" "}
                      {order.address.city}
                    </p>
                    <p>
                      <span className="font-medium">Pincode:</span>{" "}
                      {order.address.pincode}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {order.address.phoneNumber}
                    </p>
                  </td>

                  {/* Items */}
                  <td className="border border-gray-300 p-4 text-sm">
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 border rounded-lg p-3 bg-white shadow-sm"
                        >
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-14 h-14 object-cover rounded-lg shadow"
                          />
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">
                              {item.title}
                            </p>
                            <p className="text-gray-600 text-xs">
                              Price: ₹{item.price}
                            </p>
                            <p className="text-gray-600 text-xs">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Total Amount */}
                  <td className="border border-gray-300 p-4 font-bold text-gray-900">
                    ₹{order.totalAmount}
                  </td>

                  {/* Status */}
                  <td className="border border-gray-300 p-4">
                    <select value={order.status}  onChange={(e)=>updateOrderstatus(order.orderId,e.target.value)} >
                      <option value="pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Manageorders;
