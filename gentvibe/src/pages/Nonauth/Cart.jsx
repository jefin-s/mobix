import React, { useContext } from "react";
import { CartContext } from "../../components.jsx/Context/Cartcontext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    removeCartitem,
    incementQuantity,
    decremnetQuantity,
    totalQuantity,
    totalprice,
  } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16 pt-20">
      <h1 className="text-2xl font-semibold mb-8 text-gray-800">
        {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your cart is empty 🛒
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex flex-col gap-6 w-full lg:w-2/3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-center sm:items-start hover:shadow-md transition-all duration-200"
              >
                {/* Image */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      ₹{item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => decremnetQuantity(item.id)}
                      className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 text-gray-800 font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => incementQuantity(item.id)}
                      className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeCartitem(item.id)}
                    className="text-red-500 hover:text-red-600 font-medium text-sm"
                  >
                    Remove
                  </button>

                  <h3 className="font-semibold text-gray-800 text-lg sm:ml-6">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>₹{totalprice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600 mb-2">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-gray-800 font-semibold text-lg mb-6">
                <span>Total</span>
                <span>₹{totalprice.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-medium transition-all"
              >
                Proceed to Checkout
              </button>

              <div className="text-center mt-4">
                <button
                  onClick={() => navigate("/products")}
                  className="text-sm text-red-500 hover:text-red-600 transition-all"
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
