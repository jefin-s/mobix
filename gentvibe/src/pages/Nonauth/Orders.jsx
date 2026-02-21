import React, { useContext, useEffect } from "react";
import { OrderContext } from "../../components/Context/UserOrderContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { myOrders, fetchMyOrders, cancelOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  // fetch orders on load
  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="p-6 pt-24">
      <h1 className="text-2xl font-semibold mb-5">🧾 My Orders</h1>

      {myOrders.length === 0 && (
        <p className="text-gray-600">You have not placed any orders yet.</p>
      )}

      {myOrders.map((order) => (
        <div
          key={order.orderId}
          className="border border-gray-300 rounded p-4 mb-4 shadow-sm"
          onClick={() => navigate(`/ordrdtails/${order.id}`)}
        >
          {/* Top Section */}

          <div className="flex justify-between items-center">
            <div>
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>

              <p className="text-green-600 font-semibold">
                Status: {order.status}
              </p>
            </div>

            {order.status === "Cancelled" ? (

  <span className="text-red-600 font-semibold">
    Cancelled
  </span>

) : (

  <button
    onClick={() => cancelOrder(order.id)}
    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
  >
    Cancel Order
  </button>

)}
          </div>

          {/* Amount */}

          <p className="mt-1">
            <strong>Total Amount:</strong> ₹{order.totalAmount}
          </p>

          <p className="mt-1 text-sm text-gray-600">
            Ordered on: {order.orderDate}
          </p>

          {/* Items */}

          <div className="mt-3">
            <strong>Items:</strong>

            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-3 mt-2"
              >
                <img src={item.thumbnail} className="w-20 h-20 rounded" />

                <p>{item.productName}</p>

                <p className="font-semibold">x{item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
