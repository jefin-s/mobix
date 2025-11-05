import React, { useContext } from "react";
import { CartContext } from "../../components.jsx/Context/Cartcontext";

const Cart = () => {
  const { cart,removeCartitem,incementQuantity ,decremnetQuantity} = useContext(CartContext);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-10">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <h1 className="text-center text-gray-500">Your Cart is empty</h1>
      ) : (
        <div className="flex flex-col flex-wrap justify-center gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white h-56 w-96 p-4 rounded-2xl shadow-md flex items-center space-x-4"
            >
              {/* Product Image */}
              <div className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-2xl h-40 w-40 object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-between items-center flex-1 h-full py-3">
                <div className="text-center">
                  <h1 className="font-semibold text-lg">{item.name}</h1>
                  <h1 className="text-gray-700 font-medium">₹{item.price*item.quantity}</h1>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300" onClick={()=>decremnetQuantity(item.id)}>
                    −
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-lg font-bold hover:bg-gray-300" onClick={()=>incementQuantity(item.id)}>
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button className="bg-red-400 text-white rounded-xl px-4 py-1 mt-2 hover:bg-red-500 transition" onClick={()=>{removeCartitem(item.id)}}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
