import React, { useContext } from "react";
import { CartContext } from "../../components/Context/Cartcontext";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const {
    cartItems,
    grandTotal,
    removeCartitem,
    incementQuantity,
    decremnetQuantity,
    totalQuantity
  } = useContext(CartContext);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16 pt-20">

      <h1 className="text-2xl font-semibold mb-8 text-gray-800">
        {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your cart is empty 🛒
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Cart Items */}
          <div className="flex flex-col gap-6 w-full lg:w-2/3">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    {item.productName}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    ₹{item.price} each
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => decremnetQuantity(item.productId, item.quantity)}
                    className="px-3 py-1 border rounded"
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => incementQuantity(item.productId, item.quantity)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeCartitem(item.productId)}
                    className="text-red-500 ml-4"
                  >
                    Remove
                  </button>

                  <h3 className="font-semibold text-gray-800">
                    ₹{item.total}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md border p-6 sticky top-24">

              <h2 className="text-lg font-semibold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-800 font-semibold text-lg mb-6">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-indigo-600 text-white py-3 rounded-md"
              >
                Proceed to Checkout
              </button>

              <div className="text-center mt-4">
                <button
                  onClick={() => navigate("/products")}
                  className="text-sm text-red-500"
                >
                  ← Continue Shopping
                </button>
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
