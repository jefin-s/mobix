import React, { useContext, useState } from "react";
import { OrderContext } from "./context/Oredercontext";

const Manageorders = () => {
  const { orders, updateOrderstatus } = useContext(OrderContext);
  const [searchTerm, setSearchterm] = useState("");

  const searchedOrders = orders.filter((item) =>
    item.shippingFullName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-amber-600">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        User Orders
      </h1>

      <div className="flex justify-end mb-5">
        <input
          type="text"
          className="border rounded-full px-4 py-2 w-full md:w-60"
          onChange={(e) => setSearchterm(e.target.value)}
          placeholder="Search by Name"
        />
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders available.</p>
      ) : (
        <div className="overflow-x-auto bg-white p-6 shadow-xl rounded-2xl border border-gray-300">
          <table className="min-w-full border-collapse">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Shipping Address</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {searchedOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {/* Order ID */}
                  <td className="p-4 font-semibold text-indigo-700">
                    {order.id}
                  </td>

                  {/* Shipping Info */}
                  <td className="p-4 text-sm">
                    <p><b>Name:</b> {order.shippingFullName}</p>
                    <p><b>Address:</b> {order.shippingAddressLine1}</p>
                    <p><b>City:</b> {order.shippingCity}</p>
                    <p><b>Phone:</b> {order.shippingPhone}</p>
                    <p><b>Country:</b> {order.shippingCountry}</p>
                  </td>

                  {/* Items */}
                  <td className="p-4">
                    {order.items?.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center gap-3 mb-2"
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.productName}
                          className="w-12 h-12 rounded"
                        />
                        <div>
                          <p className="font-medium">
                            {item.productName}
                          </p>
                          <p className="text-xs">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </td>

                  {/* Total */}
                  <td className="p-4 font-bold">
                    ₹{order.totalAmount}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                  <select
  value={order.orderStatus}
  onChange={(e) =>
    updateOrderstatus(order.id, Number(e.target.value))
  }
  className="border rounded px-2 py-1"
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
      )}
    </div>
  );
};

export default Manageorders;
