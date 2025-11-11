import React, { useContext, useState } from 'react'
import { OrderContext } from './context/Oredercontext'

const Manageorders = () => {
    const{orders}=useContext(OrderContext)
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Orders</h1>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders available.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-indigo-600 mb-2">
                Order ID: {order.orderId}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-2 border rounded-md hover:bg-gray-50 transition"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-500">Price: ${item.price}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Manageorders