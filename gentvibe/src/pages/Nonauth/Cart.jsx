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
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-center mb-10">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <h1 className="text-center text-gray-500 text-lg">
          Your cart is empty
        </h1>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Cart items section */}
          <div className="flex flex-col items-center w-full lg:w-2/3 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white w-full md:w-[600px] p-4 rounded-2xl shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product image */}
                <div className="shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="rounded-2xl h-40 w-40 object-cover"
                  />
                </div>

                {/* Product details */}
                <div className="flex flex-col justify-between items-center sm:items-start flex-1 h-full py-2 text-center sm:text-left">
                  <h1 className="font-semibold text-lg">{item.title}</h1>
                  <h1 className="text-gray-700 font-medium">
                    ₹{item.price * item.quantity}
                  </h1>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-center sm:justify-start space-x-3 my-2">
                    <button
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300"
                      onClick={() => decremnetQuantity(item.id)}
                    >
                      −
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300"
                      onClick={() => incementQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove button */}
                  <button
                    className="bg-red-500 text-white rounded-lg px-4 py-1 mt-2 hover:bg-red-600 transition-all"
                    onClick={() => removeCartitem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h1 className="text-2xl font-bold text-center mb-6">
                Order Summary
              </h1>

              <div className="flex justify-between mb-3 text-gray-700">
                <span>Quantity:</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between mb-3 text-gray-700">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between mb-6 text-gray-700 font-semibold text-lg">
                <span>Total Price:</span>
                <span>₹{totalprice}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition-all duration-300 hover:scale-105"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
