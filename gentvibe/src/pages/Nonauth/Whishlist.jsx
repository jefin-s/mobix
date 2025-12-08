import React, { useContext } from "react";
import { Wishcontext } from "../../components.jsx/Context/Wishcontext";

const Whishlist = () => {
  const { whishlist, Togglewhishlist } = useContext(Wishcontext);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 pt-24">
      <h1 className="text-center text-4xl font-extrabold mb-10 text-gray-800 tracking-wide">
        Your Wishlist ❤️
      </h1>

      {whishlist.length === 0 ? (
        <p className="text-center text-gray-600 text-xl mt-24">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {whishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              {/* Image */}
              <div className="flex justify-center bg-gray-100 p-6">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-44 object-contain drop-shadow-sm"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                  {item.title}
                </h2>

                <p className="text-gray-700 font-semibold mt-2">
                  Price:{" "}
                  <span className="text-green-600 font-bold">
                    ₹{item.price}
                  </span>
                </p>

                <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Remove */}
                <button
                  onClick={() => Togglewhishlist(item)}
                  className="w-full mt-5 bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 active:scale-95 transition-all duration-200"
                >
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

export default Whishlist;
